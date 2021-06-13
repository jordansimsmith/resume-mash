import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useGetMashQuery } from '../generated/graphql/graphql';
import { createUrqlClient } from '../lib/graphql/urqlClient';

const IndexPage: NextPage = () => {
  useGetMashQuery();

  return (
    <div>
      <main>
        <h1>Resume Mash</h1>
      </main>

      <footer>Jordan Sim-Smith</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(IndexPage);
