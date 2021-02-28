using System.IO;
using System.Threading.Tasks;

namespace ResumeMash.Services
{
    public class ResumeStorageService: IResumeStorageService
    {
        public Task UploadResumeAsync(Stream resumeStream, string resumeKey)
        {
            // TODO: implement S3 upload
            return Task.CompletedTask;
        }
    }
}