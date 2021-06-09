using System.Collections.Generic;
using System.Threading.Tasks;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Models;

namespace ResumeMash.Core.Interfaces
{
    public interface IResultService
    {
        /// <summary>
        ///     Persists a result between two resumes, submitted by a user
        /// </summary>
        /// <param name="resultCreateModel"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Result> SaveResultAsync(ResultCreateModel resultCreateModel, string userId);

        /// <summary>
        ///     Returns the results history for a resume
        /// </summary>
        /// <param name="resumeId"></param>
        /// <returns></returns>
        Task<IEnumerable<Result>> ListResultsAsync(int resumeId);
    }
}