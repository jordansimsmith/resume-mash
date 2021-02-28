using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeMash.Mappers;
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
        public async Task<JsonResult> CreateResult(ResultModel resultModel)
        {
            var result = await _resultService.SaveResultAsync(resultModel, User.Identity.Name);

            return new JsonResult(result.ToResultModel());
        }
    }
}