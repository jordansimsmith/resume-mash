using System.Collections.Generic;
using System.Threading.Tasks;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Models;

namespace ResumeMash.Core.Interfaces
{
    public interface IResumeService
    {
        /// <summary>
        ///     Persists the provided resume information
        /// </summary>
        /// <param name="resume"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Resume> SaveResumeAsync(ResumeUploadModel resume, string userId);

        /// <summary>
        ///     Retrieves all the resumes for the current user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<IEnumerable<Resume>> ListResumesAsync(string userId);

        /// <summary>
        ///     Gets a resume by id
        /// </summary>
        /// <param name="resumeId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Resume> GetResumeAsync(int resumeId, string userId);
    }
}