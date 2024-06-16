import { useToggler } from "@/hooks/use-toggler";
import { Separator } from "@/components/primitives/separator";
import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import { cn } from "@/utils/cn";
import CreateCore from "../CreateCore";
import { useUser } from "@/hooks/use-user";
import { useFetchCores } from "@/hooks/use-fetch";

export default function SideBar() {
  const { isSidebarOpen } = useToggler();

  const { user } = useUser();
  const { core } = useFetchCores();
  if (user.userType === "NORMAL") return;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 border-r border-white py-4 bg-gradient-to-r from-primary transition-all duration-300 px-1 z-10",
        isSidebarOpen
          ? "w-48  via-primary to-primary"
          : "w-24  via-secondary to-secondary"
      )}
    >
      <Dialog>
        <DialogTrigger>
          <CoreIcons
            isDrawerOpen={isSidebarOpen}
            heading="Add New Core"
            src="https://t4.ftcdn.net/jpg/01/26/10/59/360_F_126105961_6vHCTRX2cPOnQTBvx9OSAwRUapYTEmYA.jpg"
          />
        </DialogTrigger>
        <CreateCore />
      </Dialog>

      <Separator className="h-[3px] w-[77%] bg-white rounded-full border" />

      <div className="flex-1 overflow-y-auto size-full flex flex-col px-4 gap-4">
        {core.allCores.map((c) => (
          <CoreIcons
            isDrawerOpen={isSidebarOpen}
            heading={c.name}
            src={c.imageUrl}
            key={c.id}
          />
        ))}
      </div>
    </div>
  );
}

const CoreIcons = ({
  className,
  src,
  heading,
  isDrawerOpen,
}: {
  className?: string;
  src: string;
  heading: string;
  isDrawerOpen?: boolean;
}) => (
  <div
    className={cn("flex gap-3 group justify-center items-center", className)}
  >
    <img
      className="size-14 rounded-full transition-all duration-300 group-hover:rounded-2xl"
      src={src}
      alt="core"
    />
    <span
      className={cn(
        "text-base text-center text-balance transition-all duration-300",
        isDrawerOpen ? "block" : "hidden"
      )}
    >
      {heading}
    </span>
  </div>
);
