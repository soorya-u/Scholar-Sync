import { PropsWithChildren } from "react";
import { Metadata } from "next";

type StudentPageLayoutProps = {
  children: React.ReactNode;
  params: { location: string; id: string };
};

export const metadata: Metadata = {
  description:
    "You have been invited to join the Scholar Sync Community. Welcome to the club.",
};

export default function LinkLayout(props: PropsWithChildren) {
  return <>{props.children}</>;
}
