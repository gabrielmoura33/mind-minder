import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateReminderInput = {
  datetime: Scalars['String'];
  description: Scalars['String'];
  userId: Scalars['String'];
};

export type GetRemindersInput = {
  datetime?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createReminder: Reminder;
  deleteReminder: Scalars['Boolean'];
};


export type MutationCreateReminderArgs = {
  data: CreateReminderInput;
};


export type MutationDeleteReminderArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  reminders: Array<Reminder>;
};


export type QueryRemindersArgs = {
  filters: GetRemindersInput;
};

export type Reminder = {
  __typename?: 'Reminder';
  createdAt: Scalars['DateTime'];
  datetime: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type CreateReminderMutationVariables = Exact<{
  input: CreateReminderInput;
}>;


export type CreateReminderMutation = { __typename?: 'Mutation', createReminder: { __typename?: 'Reminder', id: string, userId: string, description: string, datetime: any } };

export type DeleteReminderMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReminderMutation = { __typename?: 'Mutation', deleteReminder: boolean };

export type GetRemindersQueryVariables = Exact<{
  datetime?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetRemindersQuery = { __typename?: 'Query', reminders: Array<{ __typename?: 'Reminder', id: string, datetime: any, description: string, userId: string, createdAt: any }> };


export const CreateReminderDocument = gql`
    mutation CreateReminder($input: CreateReminderInput!) {
  createReminder(data: $input) {
    id
    userId
    description
    datetime
  }
}
    `;
export type CreateReminderMutationFn = Apollo.MutationFunction<CreateReminderMutation, CreateReminderMutationVariables>;

/**
 * __useCreateReminderMutation__
 *
 * To run a mutation, you first call `useCreateReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReminderMutation, { data, loading, error }] = useCreateReminderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReminderMutation(baseOptions?: Apollo.MutationHookOptions<CreateReminderMutation, CreateReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReminderMutation, CreateReminderMutationVariables>(CreateReminderDocument, options);
      }
export type CreateReminderMutationHookResult = ReturnType<typeof useCreateReminderMutation>;
export type CreateReminderMutationResult = Apollo.MutationResult<CreateReminderMutation>;
export type CreateReminderMutationOptions = Apollo.BaseMutationOptions<CreateReminderMutation, CreateReminderMutationVariables>;
export const DeleteReminderDocument = gql`
    mutation DeleteReminder($id: String!) {
  deleteReminder(id: $id)
}
    `;
export type DeleteReminderMutationFn = Apollo.MutationFunction<DeleteReminderMutation, DeleteReminderMutationVariables>;

/**
 * __useDeleteReminderMutation__
 *
 * To run a mutation, you first call `useDeleteReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReminderMutation, { data, loading, error }] = useDeleteReminderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReminderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReminderMutation, DeleteReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReminderMutation, DeleteReminderMutationVariables>(DeleteReminderDocument, options);
      }
export type DeleteReminderMutationHookResult = ReturnType<typeof useDeleteReminderMutation>;
export type DeleteReminderMutationResult = Apollo.MutationResult<DeleteReminderMutation>;
export type DeleteReminderMutationOptions = Apollo.BaseMutationOptions<DeleteReminderMutation, DeleteReminderMutationVariables>;
export const GetRemindersDocument = gql`
    query GetReminders($datetime: String, $description: String, $userId: String) {
  reminders(
    filters: {datetime: $datetime, description: $description, userId: $userId}
  ) {
    id
    datetime
    description
    userId
    createdAt
  }
}
    `;

/**
 * __useGetRemindersQuery__
 *
 * To run a query within a React component, call `useGetRemindersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRemindersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRemindersQuery({
 *   variables: {
 *      datetime: // value for 'datetime'
 *      description: // value for 'description'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetRemindersQuery(baseOptions?: Apollo.QueryHookOptions<GetRemindersQuery, GetRemindersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRemindersQuery, GetRemindersQueryVariables>(GetRemindersDocument, options);
      }
export function useGetRemindersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRemindersQuery, GetRemindersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRemindersQuery, GetRemindersQueryVariables>(GetRemindersDocument, options);
        }
export type GetRemindersQueryHookResult = ReturnType<typeof useGetRemindersQuery>;
export type GetRemindersLazyQueryHookResult = ReturnType<typeof useGetRemindersLazyQuery>;
export type GetRemindersQueryResult = Apollo.QueryResult<GetRemindersQuery, GetRemindersQueryVariables>;