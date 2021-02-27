using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<JsonResult> CreateResume(ResumeModel resumeModel)
        {
            var resume = await _resumeService.SaveResumeAsync(resumeModel);

            return new JsonResult(resume);
        }
    }
}