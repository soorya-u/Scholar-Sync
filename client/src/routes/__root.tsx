import React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/auth/sign-up" className="[&.active]:font-bold">
          Sign Up
        </Link>{" "}
        <Link to="/auth/login" className="[&.active]:font-bold">
          Login
        </Link>{" "}
        <Link to="/upload/file" className="[&.active]:font-bold">
          File
        </Link>{" "}
        <Link to="/upload/announcement" className="[&.active]:font-bold">
          Announcement
        </Link>{" "}
      </div>
      <hr />
      <Outlet />
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </>
  ),
});
