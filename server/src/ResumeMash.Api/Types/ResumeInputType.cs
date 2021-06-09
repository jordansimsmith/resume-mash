using HotChocolate.Types;
using ResumeMash.Api.Inputs;

namespace ResumeMash.Api.Types
{
    public class ResumeInputType : InputObjectType<ResumeInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<ResumeInput> descriptor)
        {
            descriptor.Name("ResumeInput");
            
            descriptor
                .Field(f => f.Name)
                .Type<NonNullType<StringType>>()
                .Name("name");

            descriptor
                .Field(f => f.File)
                .Type<NonNullType<UploadType>>()
                .Name("file");
        }
    }
}