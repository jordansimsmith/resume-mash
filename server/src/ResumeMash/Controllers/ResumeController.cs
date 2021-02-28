using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ResumeMash.Mappers;
using ResumeMash.Models;
using ResumeMash.Services;

namespace ResumeMash.Controllers
{
    [ApiController]
    public class ResumeController: ControllerBase
    {
        private readonly IResumeService _resumeService;

        public ResumeController(IResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpPost("/resumes")]
        [Consumes("multipart/form-data")]
        public async Task<JsonResult> CreateResume([FromForm] ResumeUploadModel resumeUploadModel)
        {
            var resume = await _resumeService.SaveResumeAsync(resumeUploadModel);
            
            return new JsonResult(resume.ToResumeModel());
        }

        [HttpGet("/resumes")]
        public async Task<JsonResult> ListResumes()
        {
            var resumes = await _resumeService.ListResumesAsync();
            var resumeModels = resumes.Select(r => r.ToResumeModel());

            return new JsonResult(resumeModels);
        }
    }
}