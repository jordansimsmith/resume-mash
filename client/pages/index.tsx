import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useGetMashQuery } from '../generated/graphql/graphql';
import { createUrqlClient } from '../lib/graphql/urqlClient';
import { ResumeViewer } from '../components/ResumeViewer';

const IndexPage: NextPage = () => {
  const [{ data, fetching }] = useGetMashQuery();

  return (
    <div>
      <main>
        {fetching ? (
          <Spinner />
        ) : (
          <Box>
            <ResumeViewer
              resumeFileUrl={data.mash.firstResume.resumeFileUrl}
              onClick={() => null}
            />
            <ResumeViewer
              resumeFileUrl={data.mash.secondResume.resumeFileUrl}
              onClick={() => null}
            />
          </Box>
        )}
      </main>

      <footer>Jordan Sim-Smith</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(IndexPage);
