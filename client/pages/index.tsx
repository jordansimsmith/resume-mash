import { NextPage } from 'next';
import Head from 'next/head';

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Resume Mash</h1>
      </main>
    </div>
  );
};

export default IndexPage;
