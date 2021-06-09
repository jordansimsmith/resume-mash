using HotChocolate.Types;
using ResumeMash.Api.Resolvers;

namespace ResumeMash.Api.Types
{
    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Name("Query");
            
            descriptor
                .Field(f => f.GetResumesAsync(default, default))
                .Type<NonNullType<ListType<NonNullType<ResumeType>>>>()
                .Name("resumes");

            descriptor
                .Field(f => f.GetResumeByIdAsync(default, default, default))
                .Argument("resumeId", a => a.Type<NonNullType<IntType>>())
                .Type<ResumeType>()
                .Name("resume");

            descriptor
                .Field(f => f.GetMashAsync(default))
                .Type<NonNullType<MashType>>()
                .Name("mash");
        }
    }
}