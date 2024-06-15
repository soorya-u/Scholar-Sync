import Header from "@/components/custom/Header";
import NavBar from "@/components/custom/SideBar";
import NexusList from "@/components/custom/NexusList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-secondary">
        <Header />
      <div className="flex flex-1 h-[82%]">
        <NavBar />
        <NexusList />
        <div className="flex-1 bg-background"></div>
      </div>
    </div>
  );
}
