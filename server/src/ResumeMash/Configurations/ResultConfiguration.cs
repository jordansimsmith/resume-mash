using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ResumeMash.Entities;

namespace ResumeMash.Configurations
{
    public class ResultConfiguration : IEntityTypeConfiguration<Result>
    {
        public void Configure(EntityTypeBuilder<Result> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.UserId).IsRequired();
            builder.Property(o => o.DateSubmitted).IsRequired();

            builder
                .HasOne(o => o.Loser)
                .WithMany()
                .HasForeignKey(o => o.LoserId);
            builder
                .HasOne(o => o.Winner)
                .WithMany()
                .HasForeignKey(o => o.WinnerId);
        }
    }
}