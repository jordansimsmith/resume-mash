using HotChocolate.Types;
using ResumeMash.Api.Inputs;

namespace ResumeMash.Api.Types
{
    public class ResultInputType : InputObjectType<ResultInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<ResultInput> descriptor)
        {
            descriptor.Name("ResultInput");

            descriptor
                .Field(f => f.WinnerId)
                .Type<NonNullType<IntType>>()
                .Name("winnerId");

            descriptor
                .Field(f => f.LoserId)
                .Type<NonNullType<IntType>>()
                .Name("loserId");
        }
    }
}