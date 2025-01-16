"use client";

import { useGroups } from "@/hooks/use-groups";

import Header from "@/components/header";
import Uploader from "@/components/modules/uploader";
import NotFound from "@/components/not-found";

import Sidebar from "@/components/modules/sidebar";
import { useCore } from "@/hooks/use-core";
import Loader from "@/components/loader";
import Viewer from "@/components/modules/viewer";

export default function DashboardPage() {
  const loading = false;

  const { groups } = useGroups();
  const { core } = useCore();

  return (
    <>
      <Sidebar />
      <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <>
            {groups.length === 0 ||
            groups.find((g) => g.id === core.id)?.nexus.length === 0 ? (
              <NotFound message="You need to join a Core inorder to Use the App" />
            ) : (
              <div className="flex flex-1 flex-col">
                <Viewer />
                <Uploader />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
