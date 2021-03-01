import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Resume } from '../types/types';

interface IndexPageProps {
  firstResume: Resume;
  secondResume: Resume;
}

const IndexPage: NextPage<IndexPageProps> = ({ firstResume, secondResume }) => {
  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Resume Mash</h1>

        <pre>{JSON.stringify(firstResume, null, 2)}</pre>

        <pre>{JSON.stringify(secondResume, null, 2)}</pre>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/mash');
  const mash = await res.json();

  return { props: { ...mash } };
};

export default IndexPage;
