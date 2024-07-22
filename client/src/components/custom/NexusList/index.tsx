import { useEffect, useState } from "react";
import CreateNexus from "../CreateNexus";
import { Button } from "@/components/primitives/button";
import { Separator } from "@/components/primitives/separator";
import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { useUser } from "@/hooks/use-user";
import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";
import { useApiData } from "@/hooks/use-api-data";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/primitives/context-menu";
import { DoorOpen, Share2Icon, Trash2 } from "lucide-react";
import { useDeleteNexus, useLeaveNexus } from "@/hooks/use-remove";
import { useLinkGenerate } from "@/hooks/use-link";

export default function NexusList() {
  const { core } = useCore();
  const { apiData } = useApiData();
  const { nexus, setNexus } = useNexus();
  const { handleClick: deleteNexusFn } = useDeleteNexus();
  const { handleClick: leaveNexusFn } = useLeaveNexus();
  const { handleClick: generateLinkFn } = useLinkGenerate();

  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(
    nexus.category || "",
  );
  const [categories, setCategories] = useState(
    core.nexus.length > 0
      ? Array.from(new Set(core.nexus.map((n) => n && n.category)))
      : [],
  );

  useEffect(() => {
    setCategories(
      core.nexus.length > 0
        ? Array.from(new Set(core.nexus.map((n) => n.category)))
        : [],
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
        <SelectTrigger className="w-[97%] border-2 border-border font-kanit text-[0.9rem]">
          <SelectValue
            placeholder={
              selectedCategory.length > 0
                ? `${selectedCategory} Semester`
                : "No Semester Found"
            }
          />
        </SelectTrigger>
        {categories.length > 0 && (
          <SelectContent className="w-[97%] border-2">
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
      <div className="flex size-full flex-1 flex-col gap-4 overflow-y-auto px-3 py-2">
        {core.nexus.length > 0 ? (
          core.nexus.map((n, idx) => {
            const apiCores = apiData.find((c) => c.id === core.id);
            const nex = apiCores!.nexus.find(
              (nexus) => nexus && nexus.id === n.id,
            );

            return (
              n &&
              n.category === selectedCategory && (
                <ContextMenu key={idx}>
                  <ContextMenuTrigger className="flex w-full items-center justify-center">
                    <Button
                      onClick={() => setNexus(nex!)}
                      className="min-w-full cursor-pointer rounded border-2 border-border px-3 py-1 text-center font-lato font-bold text-foreground"
                      variant="outline"
                    >
                      {n.name}
                    </Button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="ml-5 mt-4 flex flex-col bg-transparent backdrop-blur-md">
                    {user.userType !== "NORMAL" && (
                      <>
                        <ContextMenuItem
                          onClick={async () =>
                            await generateLinkFn("Nexus", n.id)
                          }
                          className="flex justify-between"
                        >
                          <p className="font-lato font-bold text-foreground">
                            Share
                          </p>
                          <Share2Icon className="flex size-4 [&>line]:text-foreground [&>path]:text-foreground [&>polyline]:text-foreground" />
                        </ContextMenuItem>
                        <ContextMenuSeparator className="w-[95%] self-center border" />
                      </>
                    )}
                    {user.userType === "NORMAL" && (
                      <>
                        <ContextMenuItem
                          onClick={async () => await leaveNexusFn(n.id)}
                          className="flex justify-between"
                        >
                          <p className="font-lato font-bold text-red-500">
                            Leave
                          </p>
                          <DoorOpen className="flex size-4 [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
                        </ContextMenuItem>
                      </>
                    )}
                    {user.userType !== "NORMAL" && (
                      <ContextMenuItem
                        onClick={async () => await deleteNexusFn(n.id)}
                        className="flex justify-between"
                      >
                        <p className="font-lato font-bold text-red-500">
                          Delete
                        </p>
                        <Trash2 className="flex size-4 [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
                      </ContextMenuItem>
                    )}
                  </ContextMenuContent>
                </ContextMenu>
              )
            );
          })
        ) : (
          <span className="w-full text-balance text-center font-lato text-sm font-bold leading-[1.15] transition-all duration-300">
            No Nexus Available
          </span>
        )}
      </div>

      {user.userType !== "NORMAL" && (
        <Dialog>
          <Separator className="h-[2px] w-[90%] border-border" />
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="mb-8 w-[90%] bg-primary text-foreground md-lg:mb-0"
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
