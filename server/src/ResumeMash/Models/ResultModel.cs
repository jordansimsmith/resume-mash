using System;

namespace ResumeMash.Models
{
    public class ResultModel
    {
        public int Id { get; set; }
        public ResumeModel Winner { get; set; }
        public ResumeModel Loser { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}