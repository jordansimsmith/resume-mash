import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};




export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}


export type Mash = {
  __typename?: 'Mash';
  firstResume: Resume;
  secondResume: Resume;
};

export type Mutation = {
  __typename?: 'Mutation';
  createResume: Resume;
  createResult: Result;
};


export type MutationCreateResumeArgs = {
  resumeInput: ResumeInput;
};


export type MutationCreateResultArgs = {
  resultInput: ResultInput;
};

export type Query = {
  __typename?: 'Query';
  resumes: Array<Resume>;
  resume?: Maybe<Resume>;
  mash: Mash;
};


export type QueryResumeArgs = {
  resumeId: Scalars['Int'];
};

export type Result = {
  __typename?: 'Result';
  id: Scalars['ID'];
  winner: Result;
  loser: Result;
  dateSubmitted: Scalars['Date'];
};

export type ResultInput = {
  winnerId: Scalars['Int'];
  loserId: Scalars['Int'];
};

export type Resume = {
  __typename?: 'Resume';
  id: Scalars['ID'];
  name: Scalars['String'];
  dateSubmitted: Scalars['Date'];
  wins: Array<Result>;
  losses: Array<Result>;
  resumeFileUrl: Scalars['String'];
  results: Array<Result>;
};

export type ResumeInput = {
  name: Scalars['String'];
  file: Scalars['Upload'];
};


export type CreateResultMutationVariables = Exact<{
  resultInput: ResultInput;
}>;


export type CreateResultMutation = (
  { __typename?: 'Mutation' }
  & { createResult: (
    { __typename?: 'Result' }
    & Pick<Result, 'id'>
  ) }
);

export type CreateResumeMutationVariables = Exact<{
  resumeInput: ResumeInput;
}>;


export type CreateResumeMutation = (
  { __typename?: 'Mutation' }
  & { createResume: (
    { __typename?: 'Resume' }
    & Pick<Resume, 'id'>
  ) }
);

export type GetMashQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMashQuery = (
  { __typename?: 'Query' }
  & { mash: (
    { __typename?: 'Mash' }
    & { firstResume: (
      { __typename?: 'Resume' }
      & Pick<Resume, 'id' | 'resumeFileUrl' | 'name'>
    ), secondResume: (
      { __typename?: 'Resume' }
      & Pick<Resume, 'id' | 'resumeFileUrl' | 'name'>
    ) }
  ) }
);


export const CreateResultDocument = gql`
    mutation createResult($resultInput: ResultInput!) {
  createResult(resultInput: $resultInput) {
    id
  }
}
    `;

export function useCreateResultMutation() {
  return Urql.useMutation<CreateResultMutation, CreateResultMutationVariables>(CreateResultDocument);
};
export const CreateResumeDocument = gql`
    mutation CreateResume($resumeInput: ResumeInput!) {
  createResume(resumeInput: $resumeInput) {
    id
  }
}
    `;

export function useCreateResumeMutation() {
  return Urql.useMutation<CreateResumeMutation, CreateResumeMutationVariables>(CreateResumeDocument);
};
export const GetMashDocument = gql`
    query GetMash {
  mash {
    firstResume {
      id
      resumeFileUrl
      name
    }
    secondResume {
      id
      resumeFileUrl
      name
    }
  }
}
    `;

export function useGetMashQuery(options: Omit<Urql.UseQueryArgs<GetMashQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMashQuery>({ query: GetMashDocument, ...options });
};