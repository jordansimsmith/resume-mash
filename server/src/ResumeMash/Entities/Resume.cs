using System;
using System.Collections.Generic;

namespace ResumeMash.Entities
{
    public class Resume
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string ResumeFileKey { get; set; }
        public string UserId { get; set; }
        public ICollection<Result> Wins { get; set; }
        public ICollection<Result> Losses { get; set; }
    }
}