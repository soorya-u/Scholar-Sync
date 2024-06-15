import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { useCoreCreate } from "@/hooks/use.create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/core")({
  component: CreateCore,
});

function CreateCore() {
  // TODO: Check for User Login

  const { errors, handleSubmit, isSubmitting, register } = useCoreCreate();

  return (
    <>
      <h1>Create Core</h1>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          {...register("name")}
          type="text"
        />
        <span className="text-red-500 text-xs px-2">
          {errors && errors.name && errors.name.message}
        </span>
        <Button
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          type="submit"
        >
          Create Core
        </Button>
      </form>
    </>
  );
}
