using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Services;

namespace ResumeMash.Controllers
{
    [ApiController]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;
        private readonly IResumeStorageService _resumeStorageService;

        public ResumeController(IResumeService resumeService, IResumeStorageService resumeStorageService)
        {
            _resumeService = resumeService;
            _resumeStorageService = resumeStorageService;
        }

        [HttpPost("/resumes")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<JsonResult> CreateResume([FromForm] ResumeUploadModel resumeUploadModel)
        {
            var resume = await _resumeService.SaveResumeAsync(resumeUploadModel, User.Identity.Name);
            var resumeModel = resume.ToResumeModel(_resumeStorageService.GeneratePreSignedUrl(resume.ResumeFileKey));

            return new JsonResult(resumeModel);
        }

        [HttpGet("/resumes")]
        [Authorize]
        public async Task<JsonResult> ListResumes()
        {
            var resumes = await _resumeService.ListResumesAsync(User.Identity.Name);
            var resumeModels = resumes.Select(r =>
                r.ToResumeModel(_resumeStorageService.GeneratePreSignedUrl(r.ResumeFileKey)));

            return new JsonResult(resumeModels);
        }
    }
}