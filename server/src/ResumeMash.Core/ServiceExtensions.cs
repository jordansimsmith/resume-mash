using Microsoft.Extensions.DependencyInjection;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Services;

namespace ResumeMash.Core
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddTransient<IResumeService, ResumeService>();
            services.AddTransient<IResultService, ResultService>();

            return services;
        }
    }
}