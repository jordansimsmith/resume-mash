using System.Reflection;
using Microsoft.EntityFrameworkCore;
using ResumeMash.Core.Entities;

namespace ResumeMash.Infrastructure.Data
{
    public class ResumeMashContext : DbContext
    {
        public ResumeMashContext(DbContextOptions<ResumeMashContext> options) : base(options)
        {
        }

        public DbSet<Resume> Resume { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}