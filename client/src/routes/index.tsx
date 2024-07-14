import { createFileRoute } from "@tanstack/react-router";

import { useInitData } from "@/hooks/use-init";

import Header from "@/components/custom/Header";
import SideBar from "@/components/custom/SideBar";
import NexusList from "@/components/custom/NexusList";
import NavBar from "@/components/custom/NavBar";
import UsersList from "@/components/custom/UsersList";
import Uploader from "@/components/custom/Uploader";
import Dashboard from "@/components/custom/Dashboard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useInitData();
  return (
    <div className="flex h-screen flex-col bg-secondary">
      <Header />
      <div className="flex flex-1 h-[82%]">
        <SideBar />
        <NexusList />
        <div className="flex-1 bg-secondary w-full h-full">
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
