"use client";

import { PropsWithChildren } from "react";

import { Toaster as ToasterProvider } from "@/components/ui/toaster";

import ApolloProvider from "./apollo";
import ReduxProvider from "./redux";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <ReduxProvider>
        {children}
        <ToasterProvider />
      </ReduxProvider>
    </ApolloProvider>
  );
}
