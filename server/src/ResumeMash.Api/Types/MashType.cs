using HotChocolate.Types;
using ResumeMash.Core.Models;

namespace ResumeMash.Api.Types
{
    public class MashType: ObjectType<MashModel>
    {
        protected override void Configure(IObjectTypeDescriptor<MashModel> descriptor)
        {
            descriptor.Name("Mash");
            
            descriptor
                .Field(f => f.FirstResume)
                .Type<NonNullType<ResumeType>>()
                .Name("firstResume");
            
            descriptor
                .Field(f => f.SecondResume)
                .Type<NonNullType<ResumeType>>()
                .Name("secondResume");
        }
    }
}