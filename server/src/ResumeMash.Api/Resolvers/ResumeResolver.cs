using HotChocolate;
using HotChocolate.Types;
using ResumeMash.Core.Entities;
using ResumeMash.Services;

namespace ResumeMash.Api.Resolvers
{
    [ExtendObjectType(nameof(Resume))]
    public class ResumeResolver
    {
        public string ResumeFileUrl([Service] IResumeStorageService resumeStorageService, [Parent] Resume resume)
        {
            return resumeStorageService.GeneratePreSignedUrl(resume.ResumeFileKey);
        }
    }
}