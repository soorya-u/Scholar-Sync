import { CirclePlus } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useApiData } from "@/hooks/use-api-data";
import { useCore } from "@/hooks/use-core";

import { Separator } from "@/components/primitives/separator";
import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import CreateCore from "../CreateCore";

import { cn } from "@/utils/cn";

export default function SideBar() {
  const { user } = useUser();
  const { apiData } = useApiData();
  const { setCore } = useCore();

  if (user.userType === "NORMAL") return;

  return (
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

      <div className="flex size-full flex-1 flex-col gap-4 overflow-y-auto px-2">
        {apiData.length === 0 ? (
          <span className="w-full text-balance text-center font-lato text-sm font-bold leading-[1.15] transition-all duration-300">
            No Cores Available
          </span>
        ) : (
          apiData.map(({ id, imageUrl, name, nexus }) => (
            <CoreIcons
              handleClick={() => setCore({ id, imageUrl, name, nexus })}
              key={id}
              heading={name}
              src={imageUrl}
            />
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
