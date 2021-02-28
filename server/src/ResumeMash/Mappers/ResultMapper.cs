using System;
using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Mappers
{
    public static class ResultMapper
    {
        public static Result ToResult(this ResultCreateModel resultCreateModel, DateTime dateSubmitted, string userId)
        {
            return new()
            {
                WinnerId = resultCreateModel.WinnerId,
                LoserId = resultCreateModel.LoserId,
                DateSubmitted = dateSubmitted,
                UserId = userId,
            };
        }
    }
}