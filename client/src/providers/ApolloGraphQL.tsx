import { PropsWithChildren } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function ApolloGraphQLProvider(props: PropsWithChildren) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
