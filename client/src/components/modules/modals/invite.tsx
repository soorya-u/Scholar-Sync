import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function InviteMemberModal({ children }: PropsWithChildren) {
  const { errors, handleSubmit, isSubmitting, register, category } =
    useNexusCreate();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-base">Create a Nexus</DialogTitle>
          <DialogDescription className="text-sm">
            Add required Fields to add a new nexus. Click create when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-center gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name{" "}
                  <span className="text-left text-xs text-red-500 opacity-65">
                    *
                  </span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  {...register("name")}
                  className="col-span-3 border border-border font-lato font-bold text-foreground placeholder:text-foreground/80"
                  placeholder="Nexus Name..."
                />
              </div>
              <span className="self-center text-balance text-sm text-red-500">
                {errors && errors.name && errors.name.message}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-left">
                  Category{" "}
                  <span className="text-left text-xs text-red-500 opacity-65">
                    *
                  </span>
                </Label>
                <Select onValueChange={category.onChange}>
                  <SelectTrigger className="col-span-3 w-full border-border font-lato font-bold text-foreground/80">
                    <SelectValue placeholder={`${category.value} Semester`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c, idx) => (
                        <SelectItem
                          className="font-lato font-bold text-foreground/80"
                          value={c}
                          key={idx}
                        >
                          {c} Semester
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <span className="self-center text-balance text-sm text-red-500">
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
    </Dialog>
  );
}
