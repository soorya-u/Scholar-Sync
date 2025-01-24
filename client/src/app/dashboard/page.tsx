"use client";

import { useTree } from "@/hooks/use-tree";
import { useTreeInit, useUserInit } from "@/hooks/use-init";

import Header from "@/components/header";
import Uploader from "@/components/modules/uploader";
import NotFound from "@/components/not-found";

import Sidebar from "@/components/modules/sidebar";
import { useCore } from "@/hooks/use-core";
import Loader from "@/components/loader";
import Viewer from "@/components/modules/viewer";

export default function DashboardPage() {
  const { loading } = useTreeInit();
  useUserInit();

  const { tree } = useTree();
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
            {tree.length === 0 ||
            tree.find((t) => t.id === core.id)?.nexus.length === 0 ? (
              // TODO: Change to Better Message
              <NotFound message="You need to join a Core inorder to Use the App" />
            ) : (
              <div className="flex flex-1 flex-col overflow-y-scroll">
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
