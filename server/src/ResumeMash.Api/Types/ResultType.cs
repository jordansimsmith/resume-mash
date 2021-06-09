using HotChocolate.Types;
using ResumeMash.Core.Entities;

namespace ResumeMash.Api.Types
{
    public class ResultType : ObjectType<Result>
    {
        protected override void Configure(IObjectTypeDescriptor<Result> descriptor)
        {
            descriptor.Name("Result");
            
            descriptor
                .Field(f => f.Id)
                .Type<NonNullType<IdType>>()
                .Name("id");

            descriptor
                .Field(f => f.WinnerId)
                .Ignore();

            descriptor
                .Field(f => f.Winner)
                .Type<NonNullType<ResultType>>()
                .Name("winner");

            descriptor
                .Field(f => f.LoserId)
                .Ignore();

            descriptor
                .Field(f => f.Loser)
                .Type<NonNullType<ResultType>>()
                .Name("loser");

            descriptor
                .Field(f => f.UserId)
                .Ignore();

            descriptor
                .Field(f => f.DateSubmitted)
                .Type<NonNullType<DateType>>()
                .Name("dateSubmitted");
        }
    }
}