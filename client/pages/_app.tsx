import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { HeaderBar } from '../components/HeaderBar';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ChakraProvider>
        <Flex direction="column">
          <Head>
            <title>Resume Mash</title>
            <meta
              name="description"
              content="ResumeMash is a web application for ranking and receiving feedback on resumes."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <HeaderBar />

          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </UserProvider>
  );
};

export default MyApp;
