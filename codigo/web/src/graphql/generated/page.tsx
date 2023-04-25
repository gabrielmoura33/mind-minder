import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/withApollo';


export async function getServerPageGetReminders
    (options: Omit<Apollo.QueryOptions<Types.GetRemindersQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetRemindersQuery>({ ...options, query: Operations.GetRemindersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetReminders = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetRemindersQuery, Types.GetRemindersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetRemindersDocument, options);
};
export type PageGetRemindersComp = React.FC<{data?: Types.GetRemindersQuery, error?: Apollo.ApolloError}>;
export const withPageGetReminders = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetRemindersQuery, Types.GetRemindersQueryVariables>) => (WrappedComponent:PageGetRemindersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetRemindersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetReminders = {
      getServerPage: getServerPageGetReminders,
      withPage: withPageGetReminders,
      usePage: useGetReminders,
    }