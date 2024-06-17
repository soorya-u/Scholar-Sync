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
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 border-r border-white py-4 bg-gradient-to-r from-primary transition-all duration-300 z-10 backdrop-blur w-24"
      )}
    >
      <Dialog>
        <DialogTrigger className="flex flex-col justify-center cursor-pointer items-center px-2 gap-1">
          <CirclePlus className="size-10 [&>*]:text-black" />
          <span className="text-sm leading-[1.15] text-black">
            Create a Core
          </span>
        </DialogTrigger>
        <CreateCore />
      </Dialog>

      <Separator className="h-[3px] w-[77%] bg-white rounded-full border my-1" />

      <div className="flex-1 overflow-y-auto size-full flex flex-col px-2 gap-4">
        {apiData.length === 0 ? (
          <span className="text-sm w-full font-lato text-center text-balance transition-all duration-300 leading-[1.15]">
            No Cores Available
          </span>
        ) : (
          apiData.map(({ nexus, ...c }) => (
            <CoreIcons
              handleClick={() => setCore(c)}
              key={c.id}
              heading={c.name}
              src={c.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
}

const CoreIcons = ({
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
      "flex flex-col gap-1 group justify-center items-center",
      className
    )}
  >
    {/* TODO: Hover transition not working */}
    <img
      className="size-12 rounded-full transition-all duration-500 group-hover:rounded-xl"
      src={src}
      alt="core"
    />
    <span
      className={cn(
        "text-sm w-full font-lato text-center text-balance transition-all duration-300 leading-[1.15]"
      )}
    >
      {heading}
    </span>
  </button>
);
