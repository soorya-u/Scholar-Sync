import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/upload/file")({
  component: FileUpload,
});

function FileUpload() {
  return (
    <div className="p-2">
      <h3>Welcome File!</h3>
    </div>
  );
}
