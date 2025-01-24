import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Announcement = {
  __typename?: 'Announcement';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  sentBy: Profile;
  timestamp: Scalars['Time']['output'];
  title: Scalars['String']['output'];
};

export type AnnouncementData = {
  message: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type BareNexus = {
  __typename?: 'BareNexus';
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Core = {
  __typename?: 'Core';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  members: Array<Maybe<ProfileWithRole>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  userRole: ProfileType;
};

export type CoreData = {
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CoreMember = {
  coreId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type File = {
  __typename?: 'File';
  description: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  fileUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sentBy: Profile;
  timestamp: Scalars['Time']['output'];
  title: Scalars['String']['output'];
};

export type FileData = {
  description: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  upload: Scalars['Upload']['input'];
};

export type GetNexusData = {
  core: Scalars['String']['input'];
};

export type LoginData = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnnouncement: Scalars['ID']['output'];
  createCore: Scalars['ID']['output'];
  createFile: Scalars['ID']['output'];
  createNexus: Scalars['ID']['output'];
  deleteCore: Scalars['Boolean']['output'];
  deleteNexus: Scalars['Boolean']['output'];
  inviteMemberToCore: Scalars['Boolean']['output'];
  inviteMemberToNexus: Scalars['Boolean']['output'];
  leaveCore: Scalars['Boolean']['output'];
  leaveNexus: Scalars['Boolean']['output'];
  removeMemberFromCore: Scalars['Boolean']['output'];
  removeMemberFromNexus: Scalars['Boolean']['output'];
  signUp: Scalars['String']['output'];
};


export type MutationCreateAnnouncementArgs = {
  input: AnnouncementData;
};


export type MutationCreateCoreArgs = {
  input: CoreData;
};


export type MutationCreateFileArgs = {
  input: FileData;
};


export type MutationCreateNexusArgs = {
  input: NexusData;
};


export type MutationDeleteCoreArgs = {
  coreId: Scalars['String']['input'];
};


export type MutationDeleteNexusArgs = {
  nexusId: Scalars['String']['input'];
};


export type MutationInviteMemberToCoreArgs = {
  input: CoreMember;
};


export type MutationInviteMemberToNexusArgs = {
  input: NexusMember;
};


export type MutationLeaveCoreArgs = {
  coreId: Scalars['String']['input'];
};


export type MutationLeaveNexusArgs = {
  nexusId: Scalars['String']['input'];
};


export type MutationRemoveMemberFromCoreArgs = {
  input: CoreMember;
};


export type MutationRemoveMemberFromNexusArgs = {
  input: NexusMember;
};


export type MutationSignUpArgs = {
  input: SignUpData;
};

export type Nexus = {
  __typename?: 'Nexus';
  announcements: Array<Maybe<Announcement>>;
  category: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  files: Array<Maybe<File>>;
  id: Scalars['ID']['output'];
  members: Array<Maybe<ProfileWithRole>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  userRole: ProfileType;
};

export type NexusData = {
  category: Scalars['String']['input'];
  coreId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NexusMember = {
  nexusId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export enum ProfileType {
  Admin = 'ADMIN',
  Normal = 'NORMAL'
}

export type ProfileWithRole = {
  __typename?: 'ProfileWithRole';
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: ProfileType;
};

export type Query = {
  __typename?: 'Query';
  getCore: Core;
  getNexus: Nexus;
  getTree: Array<Maybe<Tree>>;
  getUser: Profile;
  login: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
};


export type QueryGetCoreArgs = {
  coreId: Scalars['String']['input'];
};


export type QueryGetNexusArgs = {
  nexusId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  input: LoginData;
};

export type SignUpData = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Tree = {
  __typename?: 'Tree';
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nexus: Array<Maybe<BareNexus>>;
};

export type CreateAnnouncementMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
}>;


export type CreateAnnouncementMutation = { __typename?: 'Mutation', createAnnouncement: string };

export type SignUpMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: string };

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type CreateCoreMutationVariables = Exact<{
  name: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
}>;


export type CreateCoreMutation = { __typename?: 'Mutation', createCore: string };

export type GetCoreQueryVariables = Exact<{
  coreId: Scalars['String']['input'];
}>;


export type GetCoreQuery = { __typename?: 'Query', getCore: { __typename?: 'Core', id: string, name: string, imageUrl: string, createdAt: any, updatedAt: any, userRole: ProfileType, members: Array<{ __typename?: 'ProfileWithRole', id: string, fullName: string, email: string, createdAt: any, role: ProfileType } | null> } };

export type DeleteCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
}>;


export type DeleteCoreMutation = { __typename?: 'Mutation', deleteCore: boolean };

export type InviteMemberToCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type InviteMemberToCoreMutation = { __typename?: 'Mutation', inviteMemberToCore: boolean };

export type RemoveMemberFromCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type RemoveMemberFromCoreMutation = { __typename?: 'Mutation', removeMemberFromCore: boolean };

export type LeaveCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
}>;


export type LeaveCoreMutation = { __typename?: 'Mutation', leaveCore: boolean };

export type CreateFileMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  upload: Scalars['Upload']['input'];
  nexusId: Scalars['String']['input'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: string };

export type CreateNexusMutationVariables = Exact<{
  name: Scalars['String']['input'];
  category: Scalars['String']['input'];
  coreId: Scalars['String']['input'];
}>;


export type CreateNexusMutation = { __typename?: 'Mutation', createNexus: string };

export type GetNexusQueryVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type GetNexusQuery = { __typename?: 'Query', getNexus: { __typename?: 'Nexus', id: string, name: string, category: string, createdAt: any, updatedAt: any, userRole: ProfileType, members: Array<{ __typename?: 'ProfileWithRole', id: string, fullName: string, email: string, createdAt: any, role: ProfileType } | null>, announcements: Array<{ __typename?: 'Announcement', id: string, title: string, message: string, timestamp: any, sentBy: { __typename?: 'Profile', id: string, fullName: string, email: string, createdAt: any } } | null>, files: Array<{ __typename?: 'File', id: string, title: string, description: string, fileName: string, fileUrl: string, timestamp: any, sentBy: { __typename?: 'Profile', id: string, fullName: string, email: string, createdAt: any } } | null> } };

export type DeleteNexusMutationVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type DeleteNexusMutation = { __typename?: 'Mutation', deleteNexus: boolean };

export type InviteMemberToNexusMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
}>;


export type InviteMemberToNexusMutation = { __typename?: 'Mutation', inviteMemberToNexus: boolean };

export type RemoveMemberFromNexusMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
}>;


export type RemoveMemberFromNexusMutation = { __typename?: 'Mutation', removeMemberFromNexus: boolean };

export type LeaveNexusMutationVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type LeaveNexusMutation = { __typename?: 'Mutation', leaveNexus: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getUser: { __typename?: 'Profile', id: string, fullName: string, email: string, createdAt: any } };

export type GetTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTreeQuery = { __typename?: 'Query', getTree: Array<{ __typename?: 'Tree', id: string, name: string, imageUrl: string, nexus: Array<{ __typename?: 'BareNexus', id: string, name: string, category: string } | null> } | null> };


export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement($title: String!, $description: String!, $nexusId: String!) {
  createAnnouncement(
    input: {title: $title, message: $description, nexusId: $nexusId}
  )
}
    `;
export type CreateAnnouncementMutationFn = Apollo.MutationFunction<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;

/**
 * __useCreateAnnouncementMutation__
 *
 * To run a mutation, you first call `useCreateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnnouncementMutation, { data, loading, error }] = useCreateAnnouncementMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useCreateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>(CreateAnnouncementDocument, options);
      }
export type CreateAnnouncementMutationHookResult = ReturnType<typeof useCreateAnnouncementMutation>;
export type CreateAnnouncementMutationResult = Apollo.MutationResult<CreateAnnouncementMutation>;
export type CreateAnnouncementMutationOptions = Apollo.BaseMutationOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($fullName: String!, $email: String!, $password: String!) {
  signUp(input: {fullName: $fullName, email: $email, password: $password})
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = gql`
    query Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password})
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const CreateCoreDocument = gql`
    mutation CreateCore($name: String!, $imageUrl: String!) {
  createCore(input: {name: $name, imageUrl: $imageUrl})
}
    `;
export type CreateCoreMutationFn = Apollo.MutationFunction<CreateCoreMutation, CreateCoreMutationVariables>;

/**
 * __useCreateCoreMutation__
 *
 * To run a mutation, you first call `useCreateCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCoreMutation, { data, loading, error }] = useCreateCoreMutation({
 *   variables: {
 *      name: // value for 'name'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useCreateCoreMutation(baseOptions?: Apollo.MutationHookOptions<CreateCoreMutation, CreateCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCoreMutation, CreateCoreMutationVariables>(CreateCoreDocument, options);
      }
export type CreateCoreMutationHookResult = ReturnType<typeof useCreateCoreMutation>;
export type CreateCoreMutationResult = Apollo.MutationResult<CreateCoreMutation>;
export type CreateCoreMutationOptions = Apollo.BaseMutationOptions<CreateCoreMutation, CreateCoreMutationVariables>;
export const GetCoreDocument = gql`
    query GetCore($coreId: String!) {
  getCore(coreId: $coreId) {
    id
    name
    imageUrl
    createdAt
    updatedAt
    userRole
    members {
      id
      fullName
      email
      createdAt
      role
    }
  }
}
    `;

/**
 * __useGetCoreQuery__
 *
 * To run a query within a React component, call `useGetCoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoreQuery({
 *   variables: {
 *      coreId: // value for 'coreId'
 *   },
 * });
 */
export function useGetCoreQuery(baseOptions: Apollo.QueryHookOptions<GetCoreQuery, GetCoreQueryVariables> & ({ variables: GetCoreQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoreQuery, GetCoreQueryVariables>(GetCoreDocument, options);
      }
export function useGetCoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoreQuery, GetCoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoreQuery, GetCoreQueryVariables>(GetCoreDocument, options);
        }
export function useGetCoreSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoreQuery, GetCoreQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoreQuery, GetCoreQueryVariables>(GetCoreDocument, options);
        }
export type GetCoreQueryHookResult = ReturnType<typeof useGetCoreQuery>;
export type GetCoreLazyQueryHookResult = ReturnType<typeof useGetCoreLazyQuery>;
export type GetCoreSuspenseQueryHookResult = ReturnType<typeof useGetCoreSuspenseQuery>;
export type GetCoreQueryResult = Apollo.QueryResult<GetCoreQuery, GetCoreQueryVariables>;
export const DeleteCoreDocument = gql`
    mutation DeleteCore($coreId: String!) {
  deleteCore(coreId: $coreId)
}
    `;
export type DeleteCoreMutationFn = Apollo.MutationFunction<DeleteCoreMutation, DeleteCoreMutationVariables>;

/**
 * __useDeleteCoreMutation__
 *
 * To run a mutation, you first call `useDeleteCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCoreMutation, { data, loading, error }] = useDeleteCoreMutation({
 *   variables: {
 *      coreId: // value for 'coreId'
 *   },
 * });
 */
export function useDeleteCoreMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCoreMutation, DeleteCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCoreMutation, DeleteCoreMutationVariables>(DeleteCoreDocument, options);
      }
export type DeleteCoreMutationHookResult = ReturnType<typeof useDeleteCoreMutation>;
export type DeleteCoreMutationResult = Apollo.MutationResult<DeleteCoreMutation>;
export type DeleteCoreMutationOptions = Apollo.BaseMutationOptions<DeleteCoreMutation, DeleteCoreMutationVariables>;
export const InviteMemberToCoreDocument = gql`
    mutation InviteMemberToCore($coreId: String!, $userId: String!) {
  inviteMemberToCore(input: {coreId: $coreId, userId: $userId})
}
    `;
export type InviteMemberToCoreMutationFn = Apollo.MutationFunction<InviteMemberToCoreMutation, InviteMemberToCoreMutationVariables>;

/**
 * __useInviteMemberToCoreMutation__
 *
 * To run a mutation, you first call `useInviteMemberToCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberToCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberToCoreMutation, { data, loading, error }] = useInviteMemberToCoreMutation({
 *   variables: {
 *      coreId: // value for 'coreId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useInviteMemberToCoreMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberToCoreMutation, InviteMemberToCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMemberToCoreMutation, InviteMemberToCoreMutationVariables>(InviteMemberToCoreDocument, options);
      }
export type InviteMemberToCoreMutationHookResult = ReturnType<typeof useInviteMemberToCoreMutation>;
export type InviteMemberToCoreMutationResult = Apollo.MutationResult<InviteMemberToCoreMutation>;
export type InviteMemberToCoreMutationOptions = Apollo.BaseMutationOptions<InviteMemberToCoreMutation, InviteMemberToCoreMutationVariables>;
export const RemoveMemberFromCoreDocument = gql`
    mutation RemoveMemberFromCore($coreId: String!, $userId: String!) {
  removeMemberFromCore(input: {coreId: $coreId, userId: $userId})
}
    `;
export type RemoveMemberFromCoreMutationFn = Apollo.MutationFunction<RemoveMemberFromCoreMutation, RemoveMemberFromCoreMutationVariables>;

/**
 * __useRemoveMemberFromCoreMutation__
 *
 * To run a mutation, you first call `useRemoveMemberFromCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberFromCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberFromCoreMutation, { data, loading, error }] = useRemoveMemberFromCoreMutation({
 *   variables: {
 *      coreId: // value for 'coreId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveMemberFromCoreMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberFromCoreMutation, RemoveMemberFromCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberFromCoreMutation, RemoveMemberFromCoreMutationVariables>(RemoveMemberFromCoreDocument, options);
      }
export type RemoveMemberFromCoreMutationHookResult = ReturnType<typeof useRemoveMemberFromCoreMutation>;
export type RemoveMemberFromCoreMutationResult = Apollo.MutationResult<RemoveMemberFromCoreMutation>;
export type RemoveMemberFromCoreMutationOptions = Apollo.BaseMutationOptions<RemoveMemberFromCoreMutation, RemoveMemberFromCoreMutationVariables>;
export const LeaveCoreDocument = gql`
    mutation LeaveCore($coreId: String!) {
  leaveCore(coreId: $coreId)
}
    `;
export type LeaveCoreMutationFn = Apollo.MutationFunction<LeaveCoreMutation, LeaveCoreMutationVariables>;

/**
 * __useLeaveCoreMutation__
 *
 * To run a mutation, you first call `useLeaveCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCoreMutation, { data, loading, error }] = useLeaveCoreMutation({
 *   variables: {
 *      coreId: // value for 'coreId'
 *   },
 * });
 */
export function useLeaveCoreMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCoreMutation, LeaveCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCoreMutation, LeaveCoreMutationVariables>(LeaveCoreDocument, options);
      }
export type LeaveCoreMutationHookResult = ReturnType<typeof useLeaveCoreMutation>;
export type LeaveCoreMutationResult = Apollo.MutationResult<LeaveCoreMutation>;
export type LeaveCoreMutationOptions = Apollo.BaseMutationOptions<LeaveCoreMutation, LeaveCoreMutationVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($title: String!, $description: String!, $upload: Upload!, $nexusId: String!) {
  createFile(
    input: {title: $title, description: $description, upload: $upload, nexusId: $nexusId}
  )
}
    `;
export type CreateFileMutationFn = Apollo.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      upload: // value for 'upload'
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useCreateFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const CreateNexusDocument = gql`
    mutation CreateNexus($name: String!, $category: String!, $coreId: String!) {
  createNexus(input: {name: $name, category: $category, coreId: $coreId})
}
    `;
export type CreateNexusMutationFn = Apollo.MutationFunction<CreateNexusMutation, CreateNexusMutationVariables>;

/**
 * __useCreateNexusMutation__
 *
 * To run a mutation, you first call `useCreateNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNexusMutation, { data, loading, error }] = useCreateNexusMutation({
 *   variables: {
 *      name: // value for 'name'
 *      category: // value for 'category'
 *      coreId: // value for 'coreId'
 *   },
 * });
 */
export function useCreateNexusMutation(baseOptions?: Apollo.MutationHookOptions<CreateNexusMutation, CreateNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNexusMutation, CreateNexusMutationVariables>(CreateNexusDocument, options);
      }
export type CreateNexusMutationHookResult = ReturnType<typeof useCreateNexusMutation>;
export type CreateNexusMutationResult = Apollo.MutationResult<CreateNexusMutation>;
export type CreateNexusMutationOptions = Apollo.BaseMutationOptions<CreateNexusMutation, CreateNexusMutationVariables>;
export const GetNexusDocument = gql`
    query GetNexus($nexusId: String!) {
  getNexus(nexusId: $nexusId) {
    id
    name
    category
    createdAt
    updatedAt
    userRole
    members {
      id
      fullName
      email
      createdAt
      role
    }
    announcements {
      id
      title
      message
      sentBy {
        id
        fullName
        email
        createdAt
      }
      timestamp
    }
    files {
      id
      title
      description
      fileName
      fileUrl
      sentBy {
        id
        fullName
        email
        createdAt
      }
      timestamp
    }
  }
}
    `;

/**
 * __useGetNexusQuery__
 *
 * To run a query within a React component, call `useGetNexusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNexusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNexusQuery({
 *   variables: {
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useGetNexusQuery(baseOptions: Apollo.QueryHookOptions<GetNexusQuery, GetNexusQueryVariables> & ({ variables: GetNexusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNexusQuery, GetNexusQueryVariables>(GetNexusDocument, options);
      }
export function useGetNexusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNexusQuery, GetNexusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNexusQuery, GetNexusQueryVariables>(GetNexusDocument, options);
        }
export function useGetNexusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNexusQuery, GetNexusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNexusQuery, GetNexusQueryVariables>(GetNexusDocument, options);
        }
export type GetNexusQueryHookResult = ReturnType<typeof useGetNexusQuery>;
export type GetNexusLazyQueryHookResult = ReturnType<typeof useGetNexusLazyQuery>;
export type GetNexusSuspenseQueryHookResult = ReturnType<typeof useGetNexusSuspenseQuery>;
export type GetNexusQueryResult = Apollo.QueryResult<GetNexusQuery, GetNexusQueryVariables>;
export const DeleteNexusDocument = gql`
    mutation DeleteNexus($nexusId: String!) {
  deleteNexus(nexusId: $nexusId)
}
    `;
export type DeleteNexusMutationFn = Apollo.MutationFunction<DeleteNexusMutation, DeleteNexusMutationVariables>;

/**
 * __useDeleteNexusMutation__
 *
 * To run a mutation, you first call `useDeleteNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNexusMutation, { data, loading, error }] = useDeleteNexusMutation({
 *   variables: {
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useDeleteNexusMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNexusMutation, DeleteNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNexusMutation, DeleteNexusMutationVariables>(DeleteNexusDocument, options);
      }
export type DeleteNexusMutationHookResult = ReturnType<typeof useDeleteNexusMutation>;
export type DeleteNexusMutationResult = Apollo.MutationResult<DeleteNexusMutation>;
export type DeleteNexusMutationOptions = Apollo.BaseMutationOptions<DeleteNexusMutation, DeleteNexusMutationVariables>;
export const InviteMemberToNexusDocument = gql`
    mutation InviteMemberToNexus($userId: String!, $nexusId: String!) {
  inviteMemberToNexus(input: {userId: $userId, nexusId: $nexusId})
}
    `;
export type InviteMemberToNexusMutationFn = Apollo.MutationFunction<InviteMemberToNexusMutation, InviteMemberToNexusMutationVariables>;

/**
 * __useInviteMemberToNexusMutation__
 *
 * To run a mutation, you first call `useInviteMemberToNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberToNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberToNexusMutation, { data, loading, error }] = useInviteMemberToNexusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useInviteMemberToNexusMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberToNexusMutation, InviteMemberToNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMemberToNexusMutation, InviteMemberToNexusMutationVariables>(InviteMemberToNexusDocument, options);
      }
export type InviteMemberToNexusMutationHookResult = ReturnType<typeof useInviteMemberToNexusMutation>;
export type InviteMemberToNexusMutationResult = Apollo.MutationResult<InviteMemberToNexusMutation>;
export type InviteMemberToNexusMutationOptions = Apollo.BaseMutationOptions<InviteMemberToNexusMutation, InviteMemberToNexusMutationVariables>;
export const RemoveMemberFromNexusDocument = gql`
    mutation RemoveMemberFromNexus($userId: String!, $nexusId: String!) {
  removeMemberFromNexus(input: {userId: $userId, nexusId: $nexusId})
}
    `;
export type RemoveMemberFromNexusMutationFn = Apollo.MutationFunction<RemoveMemberFromNexusMutation, RemoveMemberFromNexusMutationVariables>;

/**
 * __useRemoveMemberFromNexusMutation__
 *
 * To run a mutation, you first call `useRemoveMemberFromNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberFromNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberFromNexusMutation, { data, loading, error }] = useRemoveMemberFromNexusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useRemoveMemberFromNexusMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberFromNexusMutation, RemoveMemberFromNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberFromNexusMutation, RemoveMemberFromNexusMutationVariables>(RemoveMemberFromNexusDocument, options);
      }
export type RemoveMemberFromNexusMutationHookResult = ReturnType<typeof useRemoveMemberFromNexusMutation>;
export type RemoveMemberFromNexusMutationResult = Apollo.MutationResult<RemoveMemberFromNexusMutation>;
export type RemoveMemberFromNexusMutationOptions = Apollo.BaseMutationOptions<RemoveMemberFromNexusMutation, RemoveMemberFromNexusMutationVariables>;
export const LeaveNexusDocument = gql`
    mutation LeaveNexus($nexusId: String!) {
  leaveNexus(nexusId: $nexusId)
}
    `;
export type LeaveNexusMutationFn = Apollo.MutationFunction<LeaveNexusMutation, LeaveNexusMutationVariables>;

/**
 * __useLeaveNexusMutation__
 *
 * To run a mutation, you first call `useLeaveNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveNexusMutation, { data, loading, error }] = useLeaveNexusMutation({
 *   variables: {
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useLeaveNexusMutation(baseOptions?: Apollo.MutationHookOptions<LeaveNexusMutation, LeaveNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveNexusMutation, LeaveNexusMutationVariables>(LeaveNexusDocument, options);
      }
export type LeaveNexusMutationHookResult = ReturnType<typeof useLeaveNexusMutation>;
export type LeaveNexusMutationResult = Apollo.MutationResult<LeaveNexusMutation>;
export type LeaveNexusMutationOptions = Apollo.BaseMutationOptions<LeaveNexusMutation, LeaveNexusMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getUser {
    id
    fullName
    email
    createdAt
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetTreeDocument = gql`
    query GetTree {
  getTree {
    id
    name
    imageUrl
    nexus {
      id
      name
      category
    }
  }
}
    `;

/**
 * __useGetTreeQuery__
 *
 * To run a query within a React component, call `useGetTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTreeQuery(baseOptions?: Apollo.QueryHookOptions<GetTreeQuery, GetTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTreeQuery, GetTreeQueryVariables>(GetTreeDocument, options);
      }
export function useGetTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTreeQuery, GetTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTreeQuery, GetTreeQueryVariables>(GetTreeDocument, options);
        }
export function useGetTreeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTreeQuery, GetTreeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTreeQuery, GetTreeQueryVariables>(GetTreeDocument, options);
        }
export type GetTreeQueryHookResult = ReturnType<typeof useGetTreeQuery>;
export type GetTreeLazyQueryHookResult = ReturnType<typeof useGetTreeLazyQuery>;
export type GetTreeSuspenseQueryHookResult = ReturnType<typeof useGetTreeSuspenseQuery>;
export type GetTreeQueryResult = Apollo.QueryResult<GetTreeQuery, GetTreeQueryVariables>;