import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex-1">
      <h3>Welcome Home!</h3>
      <Link to="/create/core">Go To Create Core</Link>
      <Link to="/auth/sign-up">Go To Auth</Link>
    </div>
  );
}
