import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { ResumeUploadForm } from '../../components/ResumeUploadForm';
import { useCreateResumeMutation } from '../../generated/graphql/graphql';
import { createUrqlClient } from '../../lib/graphql/urqlClient';

const NewResumePage: NextPage = () => {
  const [] = useCreateResumeMutation();

  return (
    <div>
      <main>
        <ResumeUploadForm />
      </main>
    </div>
  );
};

export default withPageAuthRequired(
  withUrqlClient(createUrqlClient)(NewResumePage) as any,
);
