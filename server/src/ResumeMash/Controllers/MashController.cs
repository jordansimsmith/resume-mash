using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ResumeMash.Services;

namespace ResumeMash.Controllers
{
    [ApiController]
    public class MashController : ControllerBase
    {
        private readonly IMashService _mashService;

        public MashController(IMashService mashService)
        {
            _mashService = mashService;
        }

        [HttpGet("/mash")]
        public async Task<JsonResult> GetMash()
        {
            var mash = await _mashService.GetMash();
            return new JsonResult(mash);
        }
    }
}