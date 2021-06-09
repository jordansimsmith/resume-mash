using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Services;

namespace ResumeMash.Api.Resolvers
{
    public class ResumeResolver
    {
        public string ResumeFileUrl([Service] IResumeStorageService resumeStorageService, [Parent] Resume resume)
        {
            return resumeStorageService.GeneratePreSignedUrl(resume.ResumeFileKey);
        }

        public async Task<IEnumerable<Result>> GetResultsForResumeAsync([Service] IResultService resultService,
            [Parent] Resume resume)
        {
            return await resultService.ListResultsAsync(resume.Id);
        }
    }
}