import Head from 'next/head';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

interface NewResumepageProps {}

const NewResumePage: NextPage<NewResumepageProps> = () => {
  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">Submit a new resume</main>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default NewResumePage;
