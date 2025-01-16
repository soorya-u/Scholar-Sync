"use client";

import { PropsWithChildren } from "react";

import { Toaster as ToasterProvider } from "@/components/ui/toaster";

import ApolloGraphQLProvider from "./apollo";
import ReduxProvider from "./redux";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloGraphQLProvider>
      <ReduxProvider>
        <SidebarProvider>{children}</SidebarProvider>
        <ToasterProvider />
      </ReduxProvider>
    </ApolloGraphQLProvider>
  );
}
