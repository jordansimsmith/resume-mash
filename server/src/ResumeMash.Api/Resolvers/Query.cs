using ResumeMash.Core.Models;

namespace ResumeMash.Api
{
    public class Query
    {
        public MashModel GetMash()
        {
            return new() {FirstResume = new ResumeModel(), SecondResume = new ResumeModel()};
        }
    }
}