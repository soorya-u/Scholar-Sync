"use client";

import { useInitData } from "@/hooks/use-init";

import Dashboard from "@/components/custom/Dashboard";
import Header from "@/components/custom/Header";
import NavBar from "@/components/custom/NavBar";
import NexusList from "@/components/custom/NexusList";
import SideBar from "@/components/custom/SideBar";
import Uploader from "@/components/custom/Uploader";
import UsersList from "@/components/custom/UsersList";

export default function Home() {
  useInitData();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 h-[82%]">
        <SideBar />
        <NexusList />
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
