using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ResumeMash.Repositories;
using ResumeMash.Services;

namespace ResumeMash
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "ResumeMash", Version = "v1"});
            });

            var connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            services.AddDbContext<ResumeMashContext>(options =>
                options
                    .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            services.AddScoped<IResumeService, ResumeService>();
            services.AddScoped<IResumeStorageService, ResumeStorageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ResumeMash v1"));
            }

            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<ResumeMashContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}