import { Button } from "@/components/primitives/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/primitives/dialog";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { useNexusCreate } from "@/hooks/use-create";

export default function CreateNexus() {
  const { errors, handleSubmit, isSubmitting, register } = useNexusCreate();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-base">Create a Core</DialogTitle>
        <DialogDescription className="text-sm">
          Add required Fields to add a new core. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-center gap-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name{" "}
                <span className="text-left text-xs opacity-65 text-red-500">
                  *
                </span>
              </Label>
              <Input
                disabled={isSubmitting}
                {...register("name")}
                className="col-span-3"
                placeholder="Nexus Name..."
              />
            </div>
            <span className="text-sm text-red-500 text-balance self-center">
              {errors && errors.name && errors.name.message}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-left">
                Category{" "}
                <span className="text-left text-xs opacity-65 text-red-500">
                  *
                </span>
              </Label>
              <Input
                {...register("category")}
                disabled={isSubmitting}
                className="col-span-3"
                placeholder="Nexus Category..."
              />
            </div>
            <span className="text-sm text-red-500 text-balance self-center">
              {errors && errors.name && errors.name.message}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            type="submit"
          >
            Create Nexus
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
