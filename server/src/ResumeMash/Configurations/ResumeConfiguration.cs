using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ResumeMash.Entities;

namespace ResumeMash.Configurations
{
    public class ResumeConfiguration : IEntityTypeConfiguration<Resume>
    {
        public void Configure(EntityTypeBuilder<Resume> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Name).IsRequired();
            builder.Property(o => o.DateSubmitted).IsRequired();
        }
    }
}