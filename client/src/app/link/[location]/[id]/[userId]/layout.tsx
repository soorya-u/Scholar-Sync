import { PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { getLinkData } from "@/lib/axios";

type LinkPageLayoutProps = {
  params: { location: string; id: string; userId: string };
};

export async function generateMetadata({
  params,
}: LinkPageLayoutProps): Promise<Metadata> {
  try {
    const body = {
      location: params.location,
      joinerId: params.id,
      userId: params.userId,
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
