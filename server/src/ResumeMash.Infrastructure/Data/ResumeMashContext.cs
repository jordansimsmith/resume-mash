using Microsoft.EntityFrameworkCore;
using ResumeMash.Configurations;
using ResumeMash.Entities;

namespace ResumeMash.Repositories
{
    public class ResumeMashContext : DbContext
    {
        public ResumeMashContext(DbContextOptions<ResumeMashContext> options) : base(options)
        {
        }

        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Result> Results { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ResumeConfiguration());
            modelBuilder.ApplyConfiguration(new ResultConfiguration());
        }
    }
}