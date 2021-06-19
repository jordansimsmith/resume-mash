import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { Resume, useCreateResultMutation } from '../generated/graphql/graphql';

interface CreateResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner?: Pick<Resume, 'id' | 'name'>;
  loser?: Pick<Resume, 'id' | 'name'>;
}

export const CreateResultModal: React.FC<CreateResultModalProps> = ({
  isOpen,
  onClose,
  winner,
  loser,
}) => {
  const [{ fetching }, createResult] = useCreateResultMutation();

  const toast = useToast();

  const handleSubmit = React.useCallback(async () => {
    if (!winner || !loser) {
      return;
    }

    const { error } = await createResult(
      {
        resultInput: { winnerId: Number(winner.id), loserId: Number(loser.id) },
      },
      { additionalTypenames: ['Mash'] },
    );
    onClose();

    if (error) {
      toast({
        title: 'Error',
        description: 'Your result could not be submitted at this time',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // success
    toast({
      title: 'Result submitted!',
      description: 'Thank you for reviewing these resumes',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }, [onClose, createResult, winner, loser, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please confirm that{' '}
          <Text color="purple.500" as="span">
            {winner.name}
          </Text>{' '}
          is a better resume than{' '}
          <Text color="purple.500" as="span">
            {loser.name}
          </Text>
          .
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button colorScheme="purple" variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleSubmit}
              isLoading={fetching}
            >
              Submit
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
