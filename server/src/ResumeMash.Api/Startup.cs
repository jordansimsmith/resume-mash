using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ResumeMash.Api.Resolvers;
using ResumeMash.Api.Types;
using ResumeMash.Core;
using ResumeMash.Infrastructure;
using ResumeMash.Infrastructure.Data;

namespace ResumeMash.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
            
            services
                .AddGraphQLServer()
                .AddQueryType<QueryType>()
                .AddMutationType<MutationType>()
                .AddType<UploadType>()
                .AddType<ResumeType>()
                .AddType<ResultType>()
                .ModifyRequestOptions(options => { options.IncludeExceptionDetails = _env.IsDevelopment(); });

            services.AddHttpContextAccessor();

            services.AddCoreServices();

            services.AddDbContext(_configuration.GetConnectionString("ResumeMash"));
            services.AddInfrastructureServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseEndpoints(endpoints => { endpoints.MapGraphQL(); });

            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<ResumeMashContext>();
            context.Database.Migrate();
        }
    }
}