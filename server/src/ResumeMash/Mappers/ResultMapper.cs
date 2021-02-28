using System;
using ResumeMash.Entities;
using ResumeMash.Models;

namespace ResumeMash.Mappers
{
    public static class ResultMapper
    {
        public static Result ToResult(this ResultModel resultModel, DateTime dateSubmitted, string userId)
        {
            return new()
            {
                Id = resultModel.Id ?? 0,
                WinnerId = resultModel.WinnerId,
                LoserId = resultModel.LoserId,
                DateSubmitted = dateSubmitted,
                UserId = userId,
            };
        }

        public static ResultModel ToResultModel(this Result result)
        {
            return new()
            {
                Id = result.Id,
                WinnerId = result.WinnerId,
                LoserId = result.LoserId,
            };
        }
    }
}