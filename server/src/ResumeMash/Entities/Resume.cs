using System;

namespace ResumeMash.Entities
{
    public class Resume
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}