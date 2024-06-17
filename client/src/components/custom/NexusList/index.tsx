import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { useState } from "react";
import CreateNexus from "../CreateNexus";
import { Button } from "@/components/primitives/button";
import { Separator } from "@/components/primitives/separator";
import { cn } from "@/utils/cn";
import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";

export default function NexusList() {
  const categories = [
    "First Semester",
    "Second Semester",
    "Third Semester",
    "Fourth Semester",
    "Fifth Semester",
    "Sixth Semester",
  ];
  const [category, setCategory] = useState(categories[0]);
  const { isSidebarOpen } = useToggler();
  const { user } = useUser();

  const routes = ["Data Structure and Algorithms", "Computer Organization"];

  return (
    <div
      className={cn(
        "relative flex bg-gradient-to-r from-primary to-secondary via-primary py-4 flex-col gap-3 items-center px-2 border-r border-white transition-all duration-300",
        isSidebarOpen ? "translate-x-0 relative" : "-translate-x-[25rem] absolute"
      )}
    >
      {/* Render Catergoies */}
      <Select onValueChange={(v) => setCategory(v)}>
        <SelectTrigger className="w-[90%]">
          <SelectValue placeholder={category} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((c, idx) => (
              <SelectItem key={idx} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex-1 overflow-y-auto size-full flex flex-col px-3 py-2 gap-4">
        {[
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
        ].map((r, idx) => (
          <h3
            className="text-center border border-white px-3 py-1 rounded cursor-pointer"
            key={idx}
          >
            {r}
          </h3>
        ))}
      </div>

      {user.userType !== "NORMAL" && (
        <Dialog>
          <Separator className="border-border h-[2px] w-[90%]" />
          <DialogTrigger asChild>
            <Button variant="outline" className="w-[90%]">
              Create a Nexus
            </Button>
          </DialogTrigger>
          <CreateNexus />
        </Dialog>
      )}
    </div>
  );
}
