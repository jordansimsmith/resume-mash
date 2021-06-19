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
} from '@chakra-ui/react';
import React from 'react';
import { Resume } from '../generated/graphql/graphql';

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
            <Button colorScheme="purple">Submit</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
