import { Suspense, PropsWithChildren } from "react";
import { Metadata } from "next";

type Props = {
  searchParams: { a: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const adder = searchParams.a === "c" ? "Core" : "Nexus";
  return {
    description: `You have been invited to the ${adder}. Click the Link to join the respective ${adder}`,
  };
}

export default function LinkLayout(props: PropsWithChildren) {
  return <Suspense>{props.children}</Suspense>;
}
