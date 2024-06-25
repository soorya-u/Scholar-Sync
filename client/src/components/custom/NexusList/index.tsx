import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { useEffect, useState } from "react";
import CreateNexus from "../CreateNexus";
import { Button } from "@/components/primitives/button";
import { Separator } from "@/components/primitives/separator";
import { cn } from "@/utils/cn";
import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";
import { useApiData } from "@/hooks/use-api-data";

export default function NexusList() {
  const { core } = useCore();
  const { apiData } = useApiData();
  const { nexus, setNexus } = useNexus();
  const { isSidebarOpen } = useToggler();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(
    nexus.category || ""
  );
  const [categories, setCategories] = useState(
    core.nexus.length > 0
      ? Array.from(new Set(core.nexus.map((n) => n.category)))
      : []
  );

  useEffect(() => {
    setCategories(
      core.nexus.length > 0
        ? Array.from(new Set(core.nexus.map((n) => n.category)))
        : []
    );
    setSelectedCategory(nexus.category);
  }, [nexus]);

  return (
    <div
      className={cn(
        "min-w-[11.3rem] relative flex bg-gradient-to-r from-primary to-secondary via-primary py-4 flex-col gap-3 items-center px-2 border-r border-white transition-all duration-300",
        isSidebarOpen
          ? "translate-x-0 relative"
          : "-translate-x-[25rem] absolute"
      )}
    >
      {/* Render Catergoies */}
      <Select
        defaultValue={selectedCategory || nexus.category}
        onValueChange={(v) => setSelectedCategory(v)}
      >
        <SelectTrigger className="w-[90%]">
          <SelectValue
            placeholder={
              selectedCategory.length > 0
                ? `${selectedCategory} Semester`
                : "No Semester Found"
            }
          />
        </SelectTrigger>
        {categories.length > 0 && (
          <SelectContent>
            <SelectGroup>
              {categories.map((c, idx) => (
                <SelectItem key={idx} value={c}>
                  {c} Semester
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        )}
      </Select>
      <div className="flex-1 overflow-y-auto size-full flex flex-col px-3 py-2 gap-4">
        {core.nexus.length > 0 ? (
          core.nexus.map((n, idx) => {
            const apiCores = apiData.find((c) => c.id === core.id);
            const nex = apiCores!.nexus.find((nexus) => nexus.id === n.id);

            return (
              n.category === selectedCategory && (
                <Button
                  onClick={() => setNexus(nex!)}
                  className="text-center border border-white px-3 py-1 rounded cursor-pointer"
                  key={idx}
                >
                  {n.name}
                </Button>
              )
            );
          })
        ) : (
          <span className="text-sm w-full font-lato text-center text-balance transition-all duration-300 leading-[1.15]">
            No Nexus Available
          </span>
        )}
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
