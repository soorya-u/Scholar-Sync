"use client";

import { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// @ts-expect-error wrong type
const link = ApolloLink.from([authLink, uploadLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function ApolloGraphQLProvider(props: PropsWithChildren) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
