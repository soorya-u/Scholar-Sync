"use client";

import { PropsWithChildren } from "react";

import { Toaster as ToasterProvider } from "@/components/ui/toaster";

import ApolloProvider from "./apollo";
import ReduxProvider from "./redux";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <ReduxProvider>
        <SidebarProvider>
          {children}
          <ToasterProvider />
        </SidebarProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
}
