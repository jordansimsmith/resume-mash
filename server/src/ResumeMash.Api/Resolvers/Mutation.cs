using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using ResumeMash.Api.Inputs;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;

namespace ResumeMash.Api.Resolvers
{
    public class Mutation
    {
        [Authorize]
        public async Task<Resume> CreateResumeAsync([Service] IResumeService resumeService,
            [Service] IHttpContextAccessor httpContextAccessor, ResumeInput resumeInput)
        {
            var user = httpContextAccessor.HttpContext.User;

            using var uploadModel = new ResumeUploadModel
            {
                Name = resumeInput.Name,
                FileName = resumeInput.File.Name,
                FileLength = resumeInput.File.Length,
                FileStream = resumeInput.File.OpenReadStream()
            };
            var resume = await resumeService.SaveResumeAsync(uploadModel, user.Identity.Name);

            return resume;
        }

        [Authorize]
        public async Task<Result> CreateResultAsync([Service] IResultService resultService,
            [Service] IHttpContextAccessor httpContextAccessor, ResultInput resultInput)
        {
            var user = httpContextAccessor.HttpContext.User;

            var model = new ResultCreateModel
            {
                WinnerId = resultInput.WinnerId,
                LoserId = resultInput.LoserId
            };

            return await resultService.SaveResultAsync(model, user.Identity.Name);
        }
    }
}