using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ResumeMash.Models
{
    public class ResumeUploadModel
    {
        [Required] public string Name { get; set; }

        [Required] public IFormFile ResumeFile { get; set; }
    }
}