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
  nexus: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Core = {
  __typename?: 'Core';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  members: Array<Maybe<ProfileWithRole>>;
  name: Scalars['String']['output'];
  nexus: Array<Maybe<Nexus>>;
  updatedAt: Scalars['Time']['output'];
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
  nexus: Scalars['String']['input'];
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
  addMemberToCore: Scalars['Boolean']['output'];
  addMemberToNexus: Scalars['Boolean']['output'];
  buildDemoEnv: Scalars['Boolean']['output'];
  createAnnouncement: Scalars['ID']['output'];
  createCore: Scalars['ID']['output'];
  createFile: Scalars['ID']['output'];
  createNexus: Scalars['ID']['output'];
  deleteCore: Scalars['Boolean']['output'];
  deleteNexus: Scalars['Boolean']['output'];
  leaveCore: Scalars['Boolean']['output'];
  leaveNexus: Scalars['Boolean']['output'];
  removeMemberFromCore: Scalars['Boolean']['output'];
  removeMemberFromNexus: Scalars['Boolean']['output'];
  signUpUser: Scalars['String']['output'];
};


export type MutationAddMemberToCoreArgs = {
  coreId: Scalars['String']['input'];
};


export type MutationAddMemberToNexusArgs = {
  nexusId: Scalars['String']['input'];
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


export type MutationLeaveCoreArgs = {
  nexusId: Scalars['String']['input'];
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


export type MutationSignUpUserArgs = {
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
};

export type NexusData = {
  category: Scalars['String']['input'];
  core: Scalars['String']['input'];
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
  getUser: Profile;
  getUserData: Array<Maybe<Core>>;
  isUserLoggedIn: Scalars['Boolean']['output'];
  logOut: Scalars['Boolean']['output'];
  loginUser: Scalars['String']['output'];
};


export type QueryLoginUserArgs = {
  input: LoginData;
};

export type SignUpData = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateAnnouncementMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  nexus: Scalars['String']['input'];
}>;


export type CreateAnnouncementMutation = { __typename?: 'Mutation', createAnnouncement: string };

export type SignUpMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUpUser: string };

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', loginUser: string };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logOut: boolean };

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = { __typename?: 'Query', isUserLoggedIn: boolean };

export type CreateCoreMutationVariables = Exact<{
  name: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
}>;


export type CreateCoreMutation = { __typename?: 'Mutation', createCore: string };

export type DeleteCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
}>;


export type DeleteCoreMutation = { __typename?: 'Mutation', deleteCore: boolean };

export type AddMemberToCoreMutationVariables = Exact<{
  coreId: Scalars['String']['input'];
}>;


export type AddMemberToCoreMutation = { __typename?: 'Mutation', addMemberToCore: boolean };

export type CreateFileMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  upload: Scalars['Upload']['input'];
  nexus: Scalars['String']['input'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: string };

export type CreateNexusMutationVariables = Exact<{
  name: Scalars['String']['input'];
  category: Scalars['String']['input'];
  core: Scalars['String']['input'];
}>;


export type CreateNexusMutation = { __typename?: 'Mutation', createNexus: string };

export type DeleteNexusMutationVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type DeleteNexusMutation = { __typename?: 'Mutation', deleteNexus: boolean };

export type LeaveNexusMutationVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type LeaveNexusMutation = { __typename?: 'Mutation', leaveNexus: boolean };

export type AddMemberToNexusMutationVariables = Exact<{
  nexusId: Scalars['String']['input'];
}>;


export type AddMemberToNexusMutation = { __typename?: 'Mutation', addMemberToNexus: boolean };

export type RemoveMemberFromNexusMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  nexusId: Scalars['String']['input'];
}>;


export type RemoveMemberFromNexusMutation = { __typename?: 'Mutation', removeMemberFromNexus: boolean };

export type CreateDemoCoreMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateDemoCoreMutation = { __typename?: 'Mutation', buildDemoEnv: boolean };

export type GetInitDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitDataQuery = { __typename?: 'Query', getUser: { __typename?: 'Profile', id: string, fullName: string } };


export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement($title: String!, $description: String!, $nexus: String!) {
  createAnnouncement(input: {title: $title, message: $description, nexus: $nexus})
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
 *      nexus: // value for 'nexus'
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
  signUpUser(input: {fullName: $fullName, email: $email, password: $password})
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
  loginUser(input: {email: $email, password: $password})
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
  logOut
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
export const IsUserLoggedInDocument = gql`
    query IsUserLoggedIn {
  isUserLoggedIn
}
    `;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
      }
export function useIsUserLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
        }
export function useIsUserLoggedInSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
        }
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInSuspenseQueryHookResult = ReturnType<typeof useIsUserLoggedInSuspenseQuery>;
export type IsUserLoggedInQueryResult = Apollo.QueryResult<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
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
export const AddMemberToCoreDocument = gql`
    mutation AddMemberToCore($coreId: String!) {
  addMemberToCore(coreId: $coreId)
}
    `;
export type AddMemberToCoreMutationFn = Apollo.MutationFunction<AddMemberToCoreMutation, AddMemberToCoreMutationVariables>;

/**
 * __useAddMemberToCoreMutation__
 *
 * To run a mutation, you first call `useAddMemberToCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberToCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberToCoreMutation, { data, loading, error }] = useAddMemberToCoreMutation({
 *   variables: {
 *      coreId: // value for 'coreId'
 *   },
 * });
 */
export function useAddMemberToCoreMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberToCoreMutation, AddMemberToCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberToCoreMutation, AddMemberToCoreMutationVariables>(AddMemberToCoreDocument, options);
      }
export type AddMemberToCoreMutationHookResult = ReturnType<typeof useAddMemberToCoreMutation>;
export type AddMemberToCoreMutationResult = Apollo.MutationResult<AddMemberToCoreMutation>;
export type AddMemberToCoreMutationOptions = Apollo.BaseMutationOptions<AddMemberToCoreMutation, AddMemberToCoreMutationVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($title: String!, $description: String!, $upload: Upload!, $nexus: String!) {
  createFile(
    input: {title: $title, description: $description, upload: $upload, nexus: $nexus}
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
 *      nexus: // value for 'nexus'
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
    mutation CreateNexus($name: String!, $category: String!, $core: String!) {
  createNexus(input: {name: $name, category: $category, core: $core})
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
 *      core: // value for 'core'
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
export const AddMemberToNexusDocument = gql`
    mutation AddMemberToNexus($nexusId: String!) {
  addMemberToNexus(nexusId: $nexusId)
}
    `;
export type AddMemberToNexusMutationFn = Apollo.MutationFunction<AddMemberToNexusMutation, AddMemberToNexusMutationVariables>;

/**
 * __useAddMemberToNexusMutation__
 *
 * To run a mutation, you first call `useAddMemberToNexusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberToNexusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberToNexusMutation, { data, loading, error }] = useAddMemberToNexusMutation({
 *   variables: {
 *      nexusId: // value for 'nexusId'
 *   },
 * });
 */
export function useAddMemberToNexusMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberToNexusMutation, AddMemberToNexusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberToNexusMutation, AddMemberToNexusMutationVariables>(AddMemberToNexusDocument, options);
      }
export type AddMemberToNexusMutationHookResult = ReturnType<typeof useAddMemberToNexusMutation>;
export type AddMemberToNexusMutationResult = Apollo.MutationResult<AddMemberToNexusMutation>;
export type AddMemberToNexusMutationOptions = Apollo.BaseMutationOptions<AddMemberToNexusMutation, AddMemberToNexusMutationVariables>;
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
export const CreateDemoCoreDocument = gql`
    mutation CreateDemoCore {
  buildDemoEnv
}
    `;
export type CreateDemoCoreMutationFn = Apollo.MutationFunction<CreateDemoCoreMutation, CreateDemoCoreMutationVariables>;

/**
 * __useCreateDemoCoreMutation__
 *
 * To run a mutation, you first call `useCreateDemoCoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDemoCoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDemoCoreMutation, { data, loading, error }] = useCreateDemoCoreMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateDemoCoreMutation(baseOptions?: Apollo.MutationHookOptions<CreateDemoCoreMutation, CreateDemoCoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDemoCoreMutation, CreateDemoCoreMutationVariables>(CreateDemoCoreDocument, options);
      }
export type CreateDemoCoreMutationHookResult = ReturnType<typeof useCreateDemoCoreMutation>;
export type CreateDemoCoreMutationResult = Apollo.MutationResult<CreateDemoCoreMutation>;
export type CreateDemoCoreMutationOptions = Apollo.BaseMutationOptions<CreateDemoCoreMutation, CreateDemoCoreMutationVariables>;
export const GetInitDataDocument = gql`
    query GetInitData {
  getUser {
    id
    fullName
  }
}
    `;

/**
 * __useGetInitDataQuery__
 *
 * To run a query within a React component, call `useGetInitDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitDataQuery(baseOptions?: Apollo.QueryHookOptions<GetInitDataQuery, GetInitDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInitDataQuery, GetInitDataQueryVariables>(GetInitDataDocument, options);
      }
export function useGetInitDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInitDataQuery, GetInitDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInitDataQuery, GetInitDataQueryVariables>(GetInitDataDocument, options);
        }
export function useGetInitDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInitDataQuery, GetInitDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInitDataQuery, GetInitDataQueryVariables>(GetInitDataDocument, options);
        }
export type GetInitDataQueryHookResult = ReturnType<typeof useGetInitDataQuery>;
export type GetInitDataLazyQueryHookResult = ReturnType<typeof useGetInitDataLazyQuery>;
export type GetInitDataSuspenseQueryHookResult = ReturnType<typeof useGetInitDataSuspenseQuery>;
export type GetInitDataQueryResult = Apollo.QueryResult<GetInitDataQuery, GetInitDataQueryVariables>;