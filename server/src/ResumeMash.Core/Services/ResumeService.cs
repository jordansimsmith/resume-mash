using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;
using ResumeMash.Services;

namespace ResumeMash.Core.Services
{
    public class ResumeService : IResumeService
    {
        private readonly IRepository<Resume> _resumeRepository;
        private readonly IResumeStorageService _resumeStorageService;

        public ResumeService(IRepository<Resume> resumeRepository, IResumeStorageService resumeStorageService)
        {
            _resumeRepository = resumeRepository;
            _resumeStorageService = resumeStorageService;
        }

        public async Task<Resume> SaveResumeAsync(ResumeUploadModel resumeUploadModel, string userId)
        {
            // approximately 1 MB
            if (resumeUploadModel.FileLength > 1_000_000)
                throw new ArgumentException("Resume file exceeded maximum size of 1 MB");
            
            var fileExtension = Path.GetExtension(resumeUploadModel.FileName);
            if (fileExtension != ".pdf") throw new ArgumentException("Resume file must be of type pdf");
            
            var resumeKey = $"resumes/{Guid.NewGuid()}";
            await _resumeStorageService.UploadResumeAsync(resumeUploadModel.FileStream, resumeKey);

            var resume = new Resume
            {
                Name = resumeUploadModel.Name,
                DateSubmitted = DateTime.Now,
                ResumeFileKey = resumeKey,
                UserId = userId
            };

            await _resumeRepository.AddAsync(resume);
            await _resumeRepository.SaveChangesAsync();

            return resume;
        }

        public async Task<IEnumerable<Resume>> ListResumesAsync(string userId)
        {
            return await _resumeRepository
                .FindAsync(r => r.UserId == userId,
                    r => r.DateSubmitted,
                    true,
                    r => r.Wins,
                    r => r.Losses);
        }

        public async Task<Resume> GetResumeAsync(int resumeId, string userId)
        {
            var resumes = await _resumeRepository
                .FindAsync(r => r.Id == resumeId && r.UserId == userId,
                    r => r.DateSubmitted,
                    false,
                    r => r.Wins,
                    r => r.Losses);

            return resumes.FirstOrDefault();
        }
    }
}