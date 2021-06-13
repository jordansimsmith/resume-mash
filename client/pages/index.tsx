import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useGetMashQuery } from '../generated/graphql/graphql';
import { createUrqlClient } from '../lib/graphql/urqlClient';

const IndexPage: NextPage = () => {
  useGetMashQuery();

  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <meta
          name="description"
          content="ResumeMash is a web application for ranking and receiving feedback on resumes."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Resume Mash</h1>
      </main>

      <footer>Jordan Sim-Smith</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(IndexPage);
