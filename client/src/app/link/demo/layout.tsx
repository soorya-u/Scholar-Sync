import { PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { defaultMetadata } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "Demo Core | Scholar Sync",
  description: `You have been invited to the Demo Core by Soorya U. Click the link and join the Community.`,
};

export default function DemoLayout(props: PropsWithChildren) {
  return <Suspense>{props.children}</Suspense>;
}
