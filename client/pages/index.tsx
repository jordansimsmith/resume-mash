import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { ResumeViewer } from '../components/ResumeViewer';
import { useGetMashQuery } from '../generated/graphql/graphql';
import { createUrqlClient } from '../lib/graphql/urqlClient';

const IndexPage: NextPage = () => {
  const [{ data, fetching }] = useGetMashQuery();

  const [isLargeScreen] = useMediaQuery('(min-width: 1000px)');

  if (fetching) {
    return (
      <Center margin="20px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box backgroundColor="gray.50" flexGrow={1}>
      <Container as="main" maxWidth="1600px">
        <Heading
          as="h3"
          size={isLargeScreen ? 'xl' : 'l'}
          color="gray.600"
          marginY="20px"
        >
          Which resume would you call in for an interview?
        </Heading>

        <SimpleGrid gap="20px" columns={isLargeScreen ? 2 : 1}>
          <ResumeViewer
            resumeFileUrl={data.mash.firstResume.resumeFileUrl}
            onClick={() => null}
          />

          <ResumeViewer
            resumeFileUrl={data.mash.secondResume.resumeFileUrl}
            onClick={() => null}
          />
        </SimpleGrid>
      </Container>

      <footer>Jordan Sim-Smith</footer>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(IndexPage);
