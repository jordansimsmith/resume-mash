using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Mappers
{
    public static class ResumeMapper
    {
        public static ResumeModel ToResumeModel(this Resume resume)
        {
            return new()
            {
                Id = resume.Id,
                Name = resume.Name,
                DateSubmitted = resume.DateSubmitted,
                ResumeFileUrl = resume.ResumeFileKey, // TODO: generate presigned URL
            };
        }
    }
}