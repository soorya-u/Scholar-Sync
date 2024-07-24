"use client";

import { Loader } from "lucide-react";

import { useInitData } from "@/hooks/use-init";
import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import { useApiData } from "@/hooks/use-api-data";
import { useNexus } from "@/hooks/use-nexus";

import Dashboard from "@/components/custom/Dashboard";
import Header from "@/components/custom/Header";
import NavBar from "@/components/custom/NavBar";
import NexusList from "@/components/custom/NexusList";
import SideBar from "@/components/custom/SideBar";
import Uploader from "@/components/custom/Uploader";
import UsersList from "@/components/custom/UsersList";
import NotFound from "@/components/custom/NotFound";

import { cn } from "@/utils/cn";
import Gradient from "@/components/custom/Gradient";

export default function Home() {
  const { loading } = useInitData();
  const { isSidebarOpen } = useToggler();
  const { apiData } = useApiData();
  const { user } = useUser();
  const { nexus } = useNexus();
  return (
    <div
      className={cn(
        "relative flex h-screen flex-col",
        loading && "items-center justify-center bg-black/40",
      )}
    >
      {loading ? (
        <>
          <Gradient />
          <div className="absolute flex items-center justify-center gap-2">
            <img src={"/logo.png"} alt="Logo" width={60} height={60} />
          </div>
          <div className="absolute">
            <Loader
              style={{ animationDuration: "2s" }}
              className="size-48 animate-spin [&_path]:text-primary"
            />
          </div>
        </>
      ) : (
        <>
          <Header />
          {apiData.length === 0 && user.userType === "NORMAL" ? (
            <NotFound message="You need to join a Core inorder to Use the App" />
          ) : (
            <div className="flex h-[82%] flex-1">
              {user.userType !== "NORMAL" && (
                <div
                  className={cn(
                    "relative hidden w-24 flex-col items-center gap-2 border-r border-border py-4 transition-all duration-300 md-lg:flex",
                  )}
                >
                  <SideBar />
                </div>
              )}
              <div
                className={cn(
                  "relative hidden min-w-[11.3rem] flex-col items-center gap-3 border-r border-border px-2 py-4 transition-all duration-300 md-lg:flex",
                  isSidebarOpen
                    ? "relative translate-x-0"
                    : "absolute -translate-x-[25rem]",
                )}
              >
                <NexusList />
              </div>
              {nexus.id === "" ? (
                <NotFound message="You need to Create or join a Nexus inorder to Use the App" />
              ) : (
                <div className="h-full w-full flex-1">
                  <NavBar />
                  <div className="flex h-[91%] flex-1">
                    <div className="flex flex-1 flex-col">
                      <div className="flex-1 overflow-x-auto">
                        <Dashboard />
                      </div>
                      <Uploader />
                    </div>
                    <UsersList />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
