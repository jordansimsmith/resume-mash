using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeMash.Models;
using ResumeMash.Services;

namespace ResumeMash.Controllers
{
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly IResultService _resultService;

        public ResultController(IResultService resultService)
        {
            _resultService = resultService;
        }

        [HttpPost("/results")]
        [Authorize]
        public async Task<JsonResult> CreateResult(ResultCreateModel resultCreateModel)
        {
            var result = await _resultService.SaveResultAsync(resultCreateModel, User.Identity.Name);

            return new JsonResult(result);
        }

        [HttpGet("resumes/{resumeId:int}/results")]
        [Authorize]
        public async Task<JsonResult> ListResultsForResume(int resumeId)
        {
            var results = await _resultService.ListResultsAsync(resumeId);

            return new JsonResult(results);
        }
    }
}