using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Mappers
{
    public static class ResumeMapper
    {
        public static Resume ToResume(this ResumeModel resumeModel)
        {
            return new()
            {
                Id = resumeModel.Id ?? 0,
                Name = resumeModel.Name,
                DateSubmitted = resumeModel.DateSubmitted,
            };
        }

        public static ResumeModel ToResumeModel(this Resume resume)
        {
            return new()
            {
                Id = resume.Id,
                Name = resume.Name,
                DateSubmitted = resume.DateSubmitted
            };
        }
    }
}