using System;
using System.IO;

namespace ResumeMash.Core.Models
{
    public class ResumeUploadModel : IDisposable
    {
        public string Name { get; set; }
        
        public string FileName { get; set; }
        public long? FileLength { get; set; }
        public Stream FileStream { get; set; }
        
        public void Dispose()
        {
            FileStream?.Dispose();
        }
    }
}