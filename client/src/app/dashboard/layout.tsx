import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Scholar Sync",
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
