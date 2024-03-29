import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@chakra-ui/button';
import {
  Box,
  Container,
  Heading,
  Wrap,
  WrapItem,
  Link,
} from '@chakra-ui/layout';

export const HeaderBar: React.FC<{}> = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogin = () => router.push('/api/auth/login');
  const handleLogout = () => router.push('/api/auth/logout');
  const handleUpload = () => router.push('/resumes/new');

  return (
    <Box backgroundColor="purple.100" padding="10px" as="header">
      <Container maxW="container.xl">
        <Wrap justify="space-between" spacing="0">
          <WrapItem>
            <Link as={NextLink} href="/">
              <Heading cursor="pointer">Resume Mash</Heading>
            </Link>
          </WrapItem>

          <WrapItem>
            <Wrap>
              {user && (
                <WrapItem>
                  <Button
                    variant="ghost"
                    colorScheme="purple"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </WrapItem>
              )}
              <WrapItem>
                <Button
                  variant="ghost"
                  colorScheme="purple"
                  onClick={user ? handleLogout : handleLogin}
                >
                  {user ? 'Logout' : 'Log in'}
                </Button>
              </WrapItem>
            </Wrap>
          </WrapItem>
        </Wrap>
      </Container>
    </Box>
  );
};
