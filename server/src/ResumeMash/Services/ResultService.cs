using System;
using System.Threading.Tasks;
using ResumeMash.Entities;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Repositories;

namespace ResumeMash.Services
{
    public class ResultService : IResultService
    {
        private readonly ResumeMashContext _dbContext;

        public ResultService(ResumeMashContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Result> SaveResultAsync(ResultModel resultModel, string userId)
        {
            if (resultModel.LoserId == resultModel.WinnerId)
            {
                throw new ArgumentException("A result cannot be between two of the same resumes");
            }

            var result = resultModel.ToResult(DateTime.Now, userId);

            await _dbContext.AddAsync(result);
            await _dbContext.SaveChangesAsync();

            return result;
        }
    }
}