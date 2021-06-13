import { cacheExchange, dedupExchange } from '@urql/core';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { NextUrqlClientConfig } from 'next-urql';

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange) => ({
  url: 'http://localhost:5000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrExchange,
    multipartFetchExchange,
  ],
});
