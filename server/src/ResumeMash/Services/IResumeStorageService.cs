using System.IO;
using System.Threading.Tasks;

namespace ResumeMash.Services
{
    public interface IResumeStorageService
    {
        /// <summary>
        /// Uploads the resume file to the storage provider
        /// </summary>
        /// <param name="resumeStream"></param>
        /// <param name="resumeKey"></param>
        /// <returns></returns>
        Task UploadResumeAsync(Stream resumeStream, string resumeKey);

        /// <summary>
        /// Generates a preSigned url for the supplied resume
        /// </summary>
        /// <param name="resumeKey"></param>
        /// <returns></returns>
        string GeneratePreSignedUrl(string resumeKey);
    }
}