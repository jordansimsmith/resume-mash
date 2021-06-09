using HotChocolate.Types;

namespace ResumeMash.Api.Inputs
{
    public class ResumeInput
    {
        public string Name { get; set; }
        public IFile File { get; set; }
    }
}