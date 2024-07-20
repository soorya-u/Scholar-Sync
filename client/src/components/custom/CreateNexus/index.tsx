import { Button } from "@/components/primitives/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";

import { useNexusCreate } from "@/hooks/use-create";

const categories = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
] as const;

export default function CreateNexus() {
  const { errors, handleSubmit, isSubmitting, register, category } =
    useNexusCreate();

  return (
    <DialogContent className="sm:max-w-[425px] rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-base">Create a Nexus</DialogTitle>
        <DialogDescription className="text-sm">
          Add required Fields to add a new core. Click save when you&apos;re
          done.
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
              <Select onValueChange={category.onChange}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder={`${category.value} Semester`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((c, idx) => (
                      <SelectItem value={c} key={idx}>
                        {c} Semester
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-red-500 text-balance self-center">
              {errors && errors.category && errors.category.message}
            </span>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              type="submit"
            >
              Create Nexus
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
