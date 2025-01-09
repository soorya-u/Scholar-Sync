import { CirclePlus, Share2, Trash2 } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useApiData } from "@/hooks/use-api-data";
import { useCore } from "@/hooks/use-core";

import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateCore from "../CreateCore";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

import { cn } from "@/utils/cn";
import { useDeleteCore } from "@/hooks/use-delete";

export default function SideBar() {
  const { user } = useUser();
  const { apiData } = useApiData();
  const { setCore } = useCore();
  const { handleClick: deleteCoreFn } = useDeleteCore();
  // const { handleClick: generateLinkFn } = useLinkGenerate();

  if (user.userType === "NORMAL") return;

  return (
    <>
      {user.userType === "ADMIN" && (
        <>
          <Dialog>
            <DialogTrigger className="flex cursor-pointer flex-col items-center justify-center gap-1 px-2 outline-none">
              <CirclePlus className="size-10 [&>*]:text-primary" />
              <span className="font-kanit text-base leading-[1.15] text-foreground">
                Create a Core
              </span>
            </DialogTrigger>
            <CreateCore />
          </Dialog>

          <Separator className="my-1 h-[3px] w-[77%] rounded-full border bg-primary" />
        </>
      )}

      <div className="flex size-full flex-1 flex-col gap-4 overflow-y-auto px-2">
        {apiData.length === 0 ? (
          <span className="w-full text-balance text-center font-lato text-sm font-bold leading-[1.15] transition-all duration-300">
            No Cores Available
          </span>
        ) : (
          apiData.map(({ id, imageUrl, name, nexus }) => (
            <ContextMenu key={id}>
              <ContextMenuTrigger className="grid place-content-center">
                <CoreIcons
                  handleClick={() =>
                    setCore({
                      id,
                      imageUrl,
                      name,
                      nexus: nexus.map((n) => ({
                        ...n,
                        creator: n.creator.id,
                      })),
                    })
                  }
                  heading={name}
                  src={imageUrl}
                />
              </ContextMenuTrigger>
              {user.userType === "ADMIN" && (
                <ContextMenuContent className="ml-5 mt-4 flex flex-col bg-transparent backdrop-blur-md">
                  <ContextMenuItem
                    // onClick={async () => await generateLinkFn("Core", id)}
                    className="flex justify-between"
                  >
                    <p className="font-lato font-bold text-foreground">Share</p>
                    <Share2 className="flex size-4 [&>line]:text-foreground [&>path]:text-foreground [&>polyline]:text-foreground" />
                  </ContextMenuItem>
                  <ContextMenuSeparator className="w-[95%] self-center" />
                  <ContextMenuItem
                    onClick={async () => await deleteCoreFn(id)}
                    className="flex justify-between"
                  >
                    <p className="font-lato font-bold text-red-500">Delete</p>
                    <Trash2 className="flex size-4 [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
                  </ContextMenuItem>
                </ContextMenuContent>
              )}
            </ContextMenu>
          ))
        )}
      </div>
    </>
  );
}

export const CoreIcons = ({
  className,
  src,
  heading,
  handleClick,
}: {
  className?: string;
  src: string;
  heading: string;
  handleClick: () => void;
}) => (
  <button
    onClick={handleClick}
    className={cn(
      "group flex flex-col items-center justify-center gap-1 outline-none transition-all",
      className,
    )}
  >
    {/* TODO: Hover transition not working */}
    <img
      className="size-14 rounded-full border-2 border-border transition-all duration-300 group-hover:rounded-xl"
      src={src}
      alt="core"
    />
    <span
      className={cn(
        "w-full text-balance text-center font-lato text-sm font-bold leading-[1.15] transition-all duration-300",
      )}
    >
      {heading}
    </span>
  </button>
);
