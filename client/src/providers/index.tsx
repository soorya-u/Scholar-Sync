"use client";

import { PropsWithChildren } from "react";
import ApolloGraphQLProvider from "./ApolloGraphQL";
import ReduxProvider from "./Redux";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloGraphQLProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ApolloGraphQLProvider>
  );
}
