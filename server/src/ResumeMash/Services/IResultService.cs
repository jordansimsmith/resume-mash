using System.Threading.Tasks;
using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Services
{
    public interface IResultService
    {
        /// <summary>
        /// Persists a result between two resumes, submitted by a user
        /// </summary>
        /// <param name="resultModel"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Result> SaveResultAsync(ResultModel resultModel, string userId);
    }
}