using HotChocolate.Types;
using ResumeMash.Api.Resolvers;

namespace ResumeMash.Api.Types
{
    public class MutationType : ObjectType<Mutation>
    {
        protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
        {
            descriptor.Name("Mutation");

            descriptor
                .Field(f => f.CreateResumeAsync(default, default, default))
                .Argument("resumeInput", a => a.Type<NonNullType<ResumeInputType>>())
                .Type<NonNullType<ResumeType>>();

            descriptor
                .Field(f => f.CreateResultAsync(default, default, default))
                .Argument("resultInput", a => a.Type<NonNullType<ResultInputType>>())
                .Type<NonNullType<ResultType>>();
        }
    }
}