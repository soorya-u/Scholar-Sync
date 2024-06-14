import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/auth/sign-up" className="[&.active]:font-bold">
        Sign Up
      </Link>{" "}
      <Link to="/auth/login" className="[&.active]:font-bold">
        Login
      </Link>{" "}
      <Link to="/upload/file" className="[&.active]:font-bold">
        File
      </Link>{" "}
      <Link to="/upload/announcement" className="[&.active]:font-bold">
        Announcement
      </Link>{" "}
      <Link to="/create/core" className="[&.active]:font-bold">
        Core
      </Link>{" "}
      <Link to="/create/nexus" className="[&.active]:font-bold">
        Nexus
      </Link>{" "}
    </div>
  );
}
