import { Suspense, PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "You have been invited to join the Scholar Sync Community. Welcome to the club.",
};

export default function LinkLayout(props: PropsWithChildren) {
  return <Suspense>{props.children}</Suspense>;
}
