import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Scholar Sync",
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}