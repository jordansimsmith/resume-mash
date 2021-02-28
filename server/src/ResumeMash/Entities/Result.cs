using System;

namespace ResumeMash.Entities
{
    public class Result
    {
        public int Id { get; set; }

        public int WinnerId { get; set; }
        public Resume Winner { get; set; }

        public int LoserId { get; set; }
        public Resume Loser { get; set; }

        public string UserId { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}