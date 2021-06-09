using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;

namespace ResumeMash.Core.Services
{
    public class ResultService : IResultService
    {
        private readonly IRepository<Result> _resultRepository;

        public ResultService(IRepository<Result> resultRepository)
        {
            _resultRepository = resultRepository;
        }

        public async Task<Result> SaveResultAsync(ResultCreateModel resultCreateModel, string userId)
        {
            if (resultCreateModel.LoserId == resultCreateModel.WinnerId)
                throw new ArgumentException("A result cannot be between two of the same resumes");

            // var result = resultCreateModel.ToResult(DateTime.Now, userId);
            var result = new Result
            {
                WinnerId = resultCreateModel.WinnerId,
                LoserId = resultCreateModel.LoserId,
                DateSubmitted = DateTime.Now,
                UserId = userId
            };

            await _resultRepository.AddAsync(result);
            await _resultRepository.SaveChangesAsync();

            return result;
        }

        public async Task<IEnumerable<Result>> ListResultsAsync(int resumeId)
        {
            return await _resultRepository.FindAsync(r => true, r => r.Id, false, r => r.Winner, r => r.Loser);
        }
    }
}