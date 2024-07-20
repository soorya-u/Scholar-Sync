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
import { useUser } from "@/hooks/use-user";
import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";
import { useApiData } from "@/hooks/use-api-data";

export default function NexusList() {
  const { core } = useCore();
  const { apiData } = useApiData();
  const { nexus, setNexus } = useNexus();

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
    <>
      {/* Render Catergoies */}
      <Select
        defaultValue={selectedCategory || nexus.category}
        onValueChange={(v: string) => setSelectedCategory(v)}
      >
        <SelectTrigger className="w-[97%] border-border border-2 text-[0.9rem] font-kanit">
          <SelectValue
            placeholder={
              selectedCategory.length > 0
                ? `${selectedCategory} Semester`
                : "No Semester Found"
            }
          />
        </SelectTrigger>
        {categories.length > 0 && (
          <SelectContent className="border-2 w-[97%]">
            <SelectGroup>
              {categories.map((c, idx) => (
                <SelectItem
                  className="font-kanit text-[0.9rem]"
                  key={idx}
                  value={c}
                >
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
                  className="text-center font-lato font-bold cursor-pointer border-2 border-border px-3 py-1 rounded text-foreground hover:bg-primary/50 hover:border-none"
                  key={idx}
                  variant="outline"
                >
                  {n.name}
                </Button>
              )
            );
          })
        ) : (
          <span className="text-sm w-full font-lato font-bold text-center text-balance transition-all duration-300 leading-[1.15]">
            No Nexus Available
          </span>
        )}
      </div>

      {user.userType !== "NORMAL" && (
        <Dialog>
          <Separator className="border-border h-[2px] w-[90%]" />
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="w-[90%] text-foreground bg-primary"
            >
              Create a Nexus
            </Button>
          </DialogTrigger>
          <CreateNexus />
        </Dialog>
      )}
    </>
  );
}
