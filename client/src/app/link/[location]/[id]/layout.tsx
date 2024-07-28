import { PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { getLinkData } from "@/lib/axios";

type LinkPageLayoutProps = {
  children: React.ReactNode;
  params: { location: string; id: string };
  searchParams: { u: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: LinkPageLayoutProps): Promise<Metadata> {
  try {
    const body = {
      location: params.location,
      joinerId: params.id,
      userId: searchParams.u,
    };
    const data = await getLinkData(body);
    return {
      title: `${data.location} | Scholar Sync`,
      description: `You have been invited to the ${data.location} ${data.name} by ${data.userFullName}. Click the link and join the Community.`,
    };
  } catch (err) {
    return {
      title: "Link | Scholar Sync",
      description:
        "You have been invited to join the Scholar Sync Community. Welcome to the club.",
    };
  }
}

export default function LinkLayout(props: PropsWithChildren) {
  return <Suspense>{props.children}</Suspense>;
}
