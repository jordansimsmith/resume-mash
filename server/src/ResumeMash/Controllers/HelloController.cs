using Microsoft.AspNetCore.Mvc;

namespace ResumeMash.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public string Hello()
        {
            return "Hello, world!";
        }
    }
}