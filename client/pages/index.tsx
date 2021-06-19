import React from 'react';
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
import { CreateResultModal } from '../components/CreateResultModal';
import { ResumeViewer } from '../components/ResumeViewer';
import { useGetMashQuery } from '../generated/graphql/graphql';
import { createUrqlClient } from '../lib/graphql/urqlClient';

const IndexPage: NextPage = () => {
  const [{ data, fetching }] = useGetMashQuery();

  const [isLargeScreen] = useMediaQuery('(min-width: 1000px)');

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<'first' | 'second'>();

  const handleResumeClick = React.useCallback(
    (newWinner: 'first' | 'second') => () => {
      setWinner(newWinner);
      setModalOpen(true);
    },
    [],
  );

  if (fetching) {
    return (
      <Center margin="20px">
        <Spinner />
      </Center>
    );
  }

  return (
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
          onClick={handleResumeClick('first')}
        />

        <ResumeViewer
          resumeFileUrl={data.mash.secondResume.resumeFileUrl}
          onClick={handleResumeClick('second')}
        />
      </SimpleGrid>

      <CreateResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        winner={
          winner === 'first' ? data.mash.firstResume : data.mash.secondResume
        }
        loser={
          winner === 'first' ? data.mash.secondResume : data.mash.firstResume
        }
      />
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(IndexPage);
