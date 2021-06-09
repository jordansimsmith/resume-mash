using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ResumeMash.Core.Entities;

namespace ResumeMash.Infrastructure.Data.Configurations
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
                .WithMany(o => o.Losses)
                .HasForeignKey(o => o.LoserId);
            builder
                .HasOne(o => o.Winner)
                .WithMany(o => o.Wins)
                .HasForeignKey(o => o.WinnerId);
        }
    }
}