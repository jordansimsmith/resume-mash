using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Services;
using ResumeMash.Infrastructure.Data;
using ResumeMash.Infrastructure.Services;
using ResumeMash.Services;

namespace ResumeMash.Infrastructure
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ResumeMashContext>(options => { options.UseNpgsql(connectionString); });

            return services;
        }

        public static IServiceCollection AddDbContextPool(this IServiceCollection services, string connectionString)
        {
            return services;
        }

        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddTransient<IRepository<Resume>, Repository<Resume>>();
            services.AddTransient<IRepository<Result>, Repository<Result>>();
            services.AddTransient<IMashService, MashService>();

            services.AddScoped<IResumeStorageService, ResumeStorageService>();

            return services;
        }
    }
}