using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;

namespace ResumeMash.Api.Resolvers
{
    public class Query
    {
        [Authorize]
        public async Task<IEnumerable<Resume>> GetResumesAsync([Service] IResumeService resumeService,
            [Service] IHttpContextAccessor httpContextAccessor)
        {
            var user = httpContextAccessor.HttpContext.User;
            return await resumeService.ListResumesAsync(user.Identity.Name);
        }

        [Authorize]
        public async Task<Resume> GetResumeByIdAsync([Service] IResumeService resumeService,
            [Service] IHttpContextAccessor httpContextAccessor, int resumeId)
        {
            var user = httpContextAccessor.HttpContext.User;

            return await resumeService.GetResumeAsync(resumeId, user.Identity.Name);
        }

        public async Task<MashModel> GetMashAsync([Service] IMashService mashService)
        {
            return await mashService.GetMashAsync();
        }
    }
}