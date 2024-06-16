import Header from "@/components/custom/Header";
import SideBar from "@/components/custom/SideBar";
import NexusList from "@/components/custom/NexusList";
import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/custom/NavBar";
import UsersList from "@/components/custom/UsersList";
import Uploader from "@/components/custom/Uploader";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/primitives/resizable";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-secondary">
      <Header />
      <div className="flex flex-1 h-[82%]">
        <SideBar />
        <NexusList />
        <div className="flex-1 bg-background w-full h-full">
          <NavBar />
          <div className="flex h-[91%] flex-1">
            <ResizablePanelGroup
              className="flex flex-col h-full flex-1"
              direction="vertical"
            >
              <ResizablePanel className="flex-1 w-full">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </ResizablePanel>
              <Uploader />
            </ResizablePanelGroup>
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
