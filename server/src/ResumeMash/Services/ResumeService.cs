using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResumeMash.Entities;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Repositories;

namespace ResumeMash.Services
{
    public class ResumeService : IResumeService
    {
        private readonly ResumeMashContext _dbContext;

        public ResumeService(ResumeMashContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Resume> SaveResumeAsync(ResumeModel resumeModel)
        {
            var resume = resumeModel.ToResume();

            await _dbContext.Resumes.AddAsync(resume);
            await _dbContext.SaveChangesAsync();

            return resume;
        }

        public async Task<IEnumerable<Resume>> ListResumesAsync()
        {
            return await _dbContext.Resumes.ToListAsync();
        }
    }
}