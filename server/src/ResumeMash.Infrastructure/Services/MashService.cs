using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;
using ResumeMash.Infrastructure.Data;

namespace ResumeMash.Core.Services
{
    public class MashService : IMashService
    {
        private readonly ResumeMashContext _dbContext;

        public MashService(ResumeMashContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<MashModel> GetMashAsync()
        {
            var count = await _dbContext.Resume.CountAsync();
            if (count < 2) throw new SystemException("Insufficient resumes in system to get a mash");

            var random = new Random();
            var firstSkip = random.Next(0, count);
            var secondSkip = random.Next(0, count - 1);

            // two random resumes
            var firstResume = await _dbContext.Resume
                .OrderBy(r => r.Id)
                .Skip(firstSkip)
                .FirstAsync();
            var secondResume = await _dbContext.Resume
                .Where(r => r.Id != firstResume.Id)
                .OrderBy(r => r.Id)
                .Skip(secondSkip)
                .FirstAsync();

            return new MashModel
            {
                FirstResume = firstResume,
                SecondResume = secondResume
            };
        }
    }
}