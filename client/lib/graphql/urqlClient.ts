import { NextUrqlClientConfig } from 'next-urql';

export const createUrqlClient: NextUrqlClientConfig = () => ({
  url: 'http://localhost:5000/graphql',
});
