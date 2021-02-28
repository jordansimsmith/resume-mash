using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Repositories;

namespace ResumeMash.Services
{
    public class MashService : IMashService
    {
        private readonly ResumeMashContext _dbContext;
        private readonly IResumeStorageService _resumeStorageService;

        public MashService(ResumeMashContext dbContext, IResumeStorageService resumeStorageService)
        {
            _dbContext = dbContext;
            _resumeStorageService = resumeStorageService;
        }

        public async Task<MashModel> GetMash()
        {
            var count = await _dbContext.Resumes.CountAsync();
            if (count < 2)
            {
                throw new SystemException("Insufficient resumes in system to get a mash");
            }

            var random = new Random();
            var firstSkip = random.Next(0, count);
            var secondSkip = random.Next(0, count - 1);

            // two random resumes
            var firstResume = await _dbContext.Resumes
                .OrderBy(r => r.Id)
                .Skip(firstSkip)
                .FirstAsync();
            var secondResume = await _dbContext.Resumes
                .Where(r => r.Id != firstResume.Id)
                .OrderBy(r => r.Id)
                .Skip(secondSkip)
                .FirstAsync();

            return new MashModel
            {
                FirstResume =
                    firstResume.ToResumeModel(_resumeStorageService.GeneratePreSignedUrl(firstResume.ResumeFileKey)),
                SecondResume =
                    secondResume.ToResumeModel(_resumeStorageService.GeneratePreSignedUrl(secondResume.ResumeFileKey)),
            };
        }
    }
}