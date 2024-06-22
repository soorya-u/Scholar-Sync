import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/primitives/toaster";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: RootPage,
});

function RootPage() {
  return (
    <>
      <Outlet />
      <Toaster />
      <React.Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </>
  );
}
