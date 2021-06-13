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


export type GetMashQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMashQuery = (
  { __typename?: 'Query' }
  & { mash: (
    { __typename?: 'Mash' }
    & { firstResume: (
      { __typename?: 'Resume' }
      & Pick<Resume, 'id'>
    ), secondResume: (
      { __typename?: 'Resume' }
      & Pick<Resume, 'id'>
    ) }
  ) }
);


export const GetMashDocument = gql`
    query GetMash {
  mash {
    firstResume {
      id
    }
    secondResume {
      id
    }
  }
}
    `;

export function useGetMashQuery(options: Omit<Urql.UseQueryArgs<GetMashQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMashQuery>({ query: GetMashDocument, ...options });
};