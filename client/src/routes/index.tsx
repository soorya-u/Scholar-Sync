import NavBar from "@/components/custom/NavBar";
import NexusList from "@/components/custom/NexusList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex">
      <NavBar />
      <NexusList />
    </div>
  );
}
