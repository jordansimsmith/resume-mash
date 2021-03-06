using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResumeMash.Entities;
using ResumeMash.Models;
using ResumeMash.Repositories;

namespace ResumeMash.Services
{
    public class ResumeService : IResumeService
    {
        private readonly ResumeMashContext _dbContext;
        private readonly IResumeStorageService _resumeStorageService;

        public ResumeService(ResumeMashContext dbContext, IResumeStorageService resumeStorageService)
        {
            _dbContext = dbContext;
            _resumeStorageService = resumeStorageService;
        }

        public async Task<Resume> SaveResumeAsync(ResumeUploadModel resumeUploadModel, string userId)
        {
            // approximately 1 MB
            if (resumeUploadModel.ResumeFile.Length > 1_000_000)
            {
                throw new ArgumentException("Resume file exceeded maximum size of 1 MB");
            }

            var fileExtension = Path.GetExtension(resumeUploadModel.ResumeFile.FileName);
            if (fileExtension != ".pdf")
            {
                throw new ArgumentException("Resume file must be of type pdf");
            }

            await using var memoryStream = new MemoryStream();
            await resumeUploadModel.ResumeFile.CopyToAsync(memoryStream);

            var resumeKey = $"resumes/{Guid.NewGuid()}";
            await _resumeStorageService.UploadResumeAsync(memoryStream, resumeKey);

            var resume = new Resume
            {
                Name = resumeUploadModel.Name,
                DateSubmitted = DateTime.Now,
                ResumeFileKey = resumeKey,
                UserId = userId,
            };

            await _dbContext.Resumes.AddAsync(resume);
            await _dbContext.SaveChangesAsync();

            return resume;
        }

        public async Task<IEnumerable<Resume>> ListResumesAsync(string userId)
        {
            return await _dbContext.Resumes
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.DateSubmitted)
                .Include(r => r.Wins)
                .Include(r => r.Losses)
                .AsSplitQuery()
                .ToListAsync();
        }

        public Task<Resume> GetResumeAsync(int resumeId, string userId)
        {
            return _dbContext.Resumes
                .Include(r => r.Wins)
                .Include(r => r.Losses)
                .AsSplitQuery()
                .FirstAsync(r => r.Id == resumeId && r.UserId == userId);
        }
    }
}