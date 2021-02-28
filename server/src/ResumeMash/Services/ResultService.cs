using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Repositories;

namespace ResumeMash.Services
{
    public class ResultService : IResultService
    {
        private readonly ResumeMashContext _dbContext;
        private readonly IResumeStorageService _resumeStorageService;

        public ResultService(ResumeMashContext dbContext, IResumeStorageService resumeStorageService)
        {
            _dbContext = dbContext;
            _resumeStorageService = resumeStorageService;
        }

        public async Task<ResultModel> SaveResultAsync(ResultCreateModel resultCreateModel, string userId)
        {
            if (resultCreateModel.LoserId == resultCreateModel.WinnerId)
            {
                throw new ArgumentException("A result cannot be between two of the same resumes");
            }

            var result = resultCreateModel.ToResult(DateTime.Now, userId);

            await _dbContext.AddAsync(result);
            await _dbContext.SaveChangesAsync();

            var savedResult = await _dbContext.Results
                .Include(r => r.Winner)
                .Include(r => r.Loser)
                .FirstAsync(r => r.Id == result.Id);

            return new ResultModel
            {
                Id = savedResult.Id,
                Loser = savedResult.Loser.ToResumeModel(
                    _resumeStorageService.GeneratePreSignedUrl(savedResult.Loser.ResumeFileKey)),
                Winner = savedResult.Winner.ToResumeModel(
                    _resumeStorageService.GeneratePreSignedUrl(savedResult.Winner.ResumeFileKey)),
                DateSubmitted = savedResult.DateSubmitted
            };
        }

        public async Task<IEnumerable<ResultModel>> ListResultsAsync(int resumeId)
        {
            var results = await _dbContext.Results
                .Include(r => r.Winner)
                .Include(r => r.Loser)
                .Where(r => r.WinnerId == resumeId || r.LoserId == resumeId)
                .ToListAsync();

            return results.Select(r => new ResultModel
            {
                Id = r.Id,
                Loser = r.Loser.ToResumeModel(
                    _resumeStorageService.GeneratePreSignedUrl(r.Loser.ResumeFileKey)),
                Winner = r.Winner.ToResumeModel(
                    _resumeStorageService.GeneratePreSignedUrl(r.Winner.ResumeFileKey)),
                DateSubmitted = r.DateSubmitted
            });
        }
    }
}