import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/upload/announcement")({
  component: CreateAnnouncement,
});

function CreateAnnouncement() {
  return (
    <div className="p-2">
      <h3>Welcome Announcement!</h3>
    </div>
  );
}
