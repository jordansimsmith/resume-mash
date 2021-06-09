using HotChocolate.Types;
using ResumeMash.Api.Resolvers;
using ResumeMash.Core.Entities;

namespace ResumeMash.Api.Types
{
    public class ResumeType : ObjectType<Resume>
    {
        protected override void Configure(IObjectTypeDescriptor<Resume> descriptor)
        {
            descriptor.Name("Resume");

            descriptor
                .Field(f => f.Id)
                .Type<NonNullType<IdType>>()
                .Name("id");

            descriptor
                .Field(f => f.Name)
                .Type<NonNullType<StringType>>()
                .Name("name");

            descriptor
                .Field(f => f.ResumeFileKey)
                .Ignore();

            descriptor
                .Field(f => f.UserId)
                .Ignore();

            descriptor
                .Field(f => f.DateSubmitted)
                .Type<NonNullType<DateType>>()
                .Name("dateSubmitted");

            descriptor
                .Field(f => f.Wins)
                .Type<NonNullType<ListType<NonNullType<ResultType>>>>()
                .Name("wins");

            descriptor
                .Field(f => f.Losses)
                .Type<NonNullType<ListType<NonNullType<ResultType>>>>()
                .Name("losses");

            descriptor
                .Field<ResumeResolver>(f => f.ResumeFileUrl(default, default))
                .Type<NonNullType<StringType>>()
                .Name("resumeFileUrl");

            descriptor
                .Field<ResumeResolver>(f => f.GetResultsForResumeAsync(default, default))
                .Type<NonNullType<ListType<NonNullType<ResultType>>>>()
                .Name("results");
        }
    }
}