import { PropsWithChildren } from "react";
import { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Scholar Sync",
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
