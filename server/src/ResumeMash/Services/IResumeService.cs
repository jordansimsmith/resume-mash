using System.Collections.Generic;
using System.Threading.Tasks;
using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Services
{
    public interface IResumeService
    {
        /// <summary>
        /// Persists the provided resume information
        /// </summary>
        /// <param name="resume"></param>
        /// <returns></returns>
        Task<Resume> SaveResumeAsync(ResumeModel resume);

        /// <summary>
        /// Retrieves all the resumes for the current user
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Resume>> ListResumesAsync();
    }
}