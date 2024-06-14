import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex-1">
      <h3>Welcome Home!</h3>
    </div>
  );
}
