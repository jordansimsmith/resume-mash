import { Center, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import React from 'react';

export const Footer: React.FC<{}> = () => {
  return (
    <Center as="footer" color="gray.600" paddingY="40px">
      <Text>Jordan Sim-Smith 2021</Text>
      <Text mx="4px">·</Text>
      <Link href="https://github.com/jordansimsmith/resume-mash" isExternal>
        View the source code <ExternalLinkIcon mx="2px" />
      </Link>
    </Center>
  );
};
