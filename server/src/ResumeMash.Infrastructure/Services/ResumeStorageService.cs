using System;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using ResumeMash.Services;

namespace ResumeMash.Infrastructure.Services
{
    public class ResumeStorageService : IResumeStorageService
    {
        private readonly string _bucketName;
        private readonly IAmazonS3 _s3Client;

        public ResumeStorageService(IConfiguration configuration)
        {
            var awsAccessKeyId = configuration["S3:AWS_ACCESS_KEY_ID"];
            var awsSecretKey = configuration["S3:AWS_SECRET_KEY"];
            var awsS3Region = configuration["S3:Region"];
            var awsCredentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretKey);
            _s3Client = new AmazonS3Client(awsCredentials, RegionEndpoint.GetBySystemName(awsS3Region));
            _bucketName = configuration["S3:BucketName"];
        }

        public async Task UploadResumeAsync(Stream resumeStream, string resumeKey)
        {
            var putObjectRequest = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = resumeKey,
                InputStream = resumeStream,
                ContentType = "application/pdf"
            };
            await _s3Client.PutObjectAsync(putObjectRequest);
        }

        public string GeneratePreSignedUrl(string resumeKey)
        {
            var getPreSignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = resumeKey,
                Expires = DateTime.Now.AddDays(1)
            };
            return _s3Client.GetPreSignedURL(getPreSignedUrlRequest);
        }
    }
}