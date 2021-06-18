using System;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using ResumeMash.Core.Entities;
using ResumeMash.Core.Interfaces;
using ResumeMash.Core.Models;
using ResumeMash.Core.Services;
using ResumeMash.Services;
using Xunit;

namespace ResumeMash.Test.Core.Services
{
    public class ResumeServiceTest
    {
        private readonly Mock<IRepository<Resume>> _mockResumeRepository;
        private readonly Mock<IResumeStorageService> _mockResumeStorageService;

        private readonly ResumeService _subject;

        public ResumeServiceTest()
        {
            _mockResumeRepository = new Mock<IRepository<Resume>>();
            _mockResumeStorageService = new Mock<IResumeStorageService>();

            _subject = new ResumeService(_mockResumeRepository.Object, _mockResumeStorageService.Object);
        }

        [Fact]
        public async Task ListResumesAsync_Should_ReturnResumes()
        {
            // arrange
            const string userId = "123";

            var resumes = new[]
            {
                new Resume
                {
                    Id = 123
                }
            };

            _mockResumeRepository.Setup(x => x.FindAsync(It.IsAny<Expression<Func<Resume, bool>>>(),
                It.IsAny<Expression<Func<Resume, object>>>(), true, It.IsAny<Expression<Func<Resume, object>>[]>()))
                .ReturnsAsync(resumes)
                .Verifiable();

            // act
            var result = await _subject.ListResumesAsync(userId);

            // assert
            result.Should().NotBeNull();
            result.First().Should().Be(resumes[0]);
            
            _mockResumeRepository.Verify();
        }
        
        [Fact]
        public async Task GetResumeAsync_Should_ReturnResume()
        {
            // arrange
            const string userId = "123";
            const int resumeId = 123;

            var resumes = new[]
            {
                new Resume
                {
                    Id = 123
                }
            };

            _mockResumeRepository.Setup(x => x.FindAsync(It.IsAny<Expression<Func<Resume, bool>>>(),
                It.IsAny<Expression<Func<Resume, object>>>(), It.IsAny<bool>(), It.IsAny<Expression<Func<Resume, object>>[]>()))
                .ReturnsAsync(resumes)
                .Verifiable();

            // act
            var result = await _subject.GetResumeAsync(resumeId, userId);

            // assert
            result.Should().NotBeNull();
            result.Should().Be(resumes[0]);
            
            _mockResumeRepository.Verify();
        }

        [Fact]
        public async Task SaveResumeAsync_Should_SaveResumeCorrectly()
        {
            // arrange
            const string userId = "123";
            
            await using var stream = new MemoryStream();
            
            var resumeUploadModel = new ResumeUploadModel
            {
                FileName = "my_resume.pdf",
                FileLength = 1000,
                Name = "My Resume",
                FileStream = stream,
            };
            
            // act
            var result = await _subject.SaveResumeAsync(resumeUploadModel, userId);

            // assert
            result.Should().NotBeNull();
            result.Name.Should().Be(resumeUploadModel.Name);
            result.UserId.Should().Be(userId);
            
            _mockResumeStorageService.Verify(x => x.UploadResumeAsync(resumeUploadModel.FileStream, It.IsAny<string>()));
            _mockResumeRepository.Verify(x => x.AddAsync(It.IsAny<Resume>()), Times.Once);
            _mockResumeRepository.Verify(x => x.SaveChangesAsync(), Times.Once);
        }
    }
}