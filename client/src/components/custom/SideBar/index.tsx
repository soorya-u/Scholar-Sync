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
        <DialogTrigger className="flex flex-col justify-center cursor-pointer items-center px-2 gap-1 outline-none">
          <CirclePlus className="size-10 [&>*]:text-primary" />
          <span className="font-kanit text-base leading-[1.15] text-foreground">
            Create a Core
          </span>
        </DialogTrigger>
        <CreateCore />
      </Dialog>

      <Separator className="h-[3px] w-[77%] bg-primary rounded-full border my-1" />

      <div className="flex-1 overflow-y-auto size-full flex flex-col px-2 gap-4">
        {apiData.length === 0 ? (
          <span className="text-sm w-full font-lato font-bold text-center text-balance transition-all duration-300 leading-[1.15]">
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
      "flex flex-col gap-1 group justify-center items-center outline-none",
      className
    )}
  >
    {/* TODO: Hover transition not working */}
    <img
      className="size-14 rounded-full transition-all duration-300 group-hover:rounded-xl border-2 border-border"
      src={src}
      alt="core"
    />
    <span
      className={cn(
        "text-sm w-full font-lato font-bold text-center text-balance transition-all duration-300 leading-[1.15]"
      )}
    >
      {heading}
    </span>
  </button>
);
