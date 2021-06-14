import { cacheExchange, dedupExchange, makeOperation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { NextUrqlClientConfig } from 'next-urql';
import { getAccessToken } from '../auth/auth';

interface AuthState {
  accessToken?: string;
}

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange) => ({
  url: 'http://localhost:5000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrExchange,
    authExchange({
      getAuth: async ({ authState }) => {
        if (!authState && typeof window !== 'undefined') {
          const accessToken = await getAccessToken();

          return { accessToken };
        }

        return null;
      },
      addAuthToOperation: ({ authState, operation }) => {
        console.log(operation);
        const accessToken = (authState as AuthState)?.accessToken;

        if (!accessToken) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          },
        });
      },
      didAuthError: ({ error }) => {
        return error.graphQLErrors.some(
          (e) => e.extensions?.code === 'AUTH_NOT_AUTHENTICATED',
        );
      },
    }),
    multipartFetchExchange,
  ],
});
