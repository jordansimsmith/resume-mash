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
    }
}