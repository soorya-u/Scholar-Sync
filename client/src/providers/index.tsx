"use client";

import { PropsWithChildren } from "react";

import { Toaster as ToasterProvider } from "@/components/primitives/toaster";

import ApolloGraphQLProvider from "./ApolloGraphQL";
import ReduxProvider from "./Redux";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloGraphQLProvider>
      <ReduxProvider>
        {children}
        <ToasterProvider />
      </ReduxProvider>
    </ApolloGraphQLProvider>
  );
}
