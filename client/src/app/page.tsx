"use client";

import { useInitData } from "@/hooks/use-init";

import Dashboard from "@/components/custom/Dashboard";
import Header from "@/components/custom/Header";
import NavBar from "@/components/custom/NavBar";
import NexusList from "@/components/custom/NexusList";
import SideBar from "@/components/custom/SideBar";
import Uploader from "@/components/custom/Uploader";
import UsersList from "@/components/custom/UsersList";

import { cn } from "@/utils/cn";
import { useToggler } from "@/hooks/use-toggler";

export default function Home() {
  useInitData();
  const { isSidebarOpen } = useToggler();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 h-[82%]">
        <div
          className={cn(
            "relative hidden flex-col items-center gap-2 border-r border-border py-4 transition-all duration-300 w-24 md-lg:flex"
          )}
        >
          <SideBar />
        </div>
        <div
          className={cn(
            "min-w-[11.3rem] relative hidden py-4 flex-col gap-3 items-center px-2 border-r border-border transition-all duration-300 md-lg:flex",
            isSidebarOpen
              ? "translate-x-0 relative"
              : "-translate-x-[25rem] absolute"
          )}
        >
          <NexusList />
        </div>
        <div className="flex-1 w-full h-full">
          <NavBar />
          <div className="flex h-[91%] flex-1">
            <div className="flex flex-col flex-1">
              <div className="flex-1">
                <Dashboard />
              </div>
              <Uploader />
            </div>
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
