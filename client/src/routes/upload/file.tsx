import { fileUploadMutation } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/upload/file")({
  component: FileUpload,
});

function FileUpload() {
  const [mutate] = useMutation(fileUploadMutation());
  return (
    <div className="p-2">
      <h3>Welcome File!</h3>
      <input
        type="file"
        required
        onChange={({ target: { validity, files } }) => {
          if (!validity.valid || !files) return;
          mutate({ variables: { file: files[0] } });
        }}
      />
    </div>
  );
}
