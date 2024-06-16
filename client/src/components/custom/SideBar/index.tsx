import { useToggler } from "@/hooks/use-toggler";
import { Separator } from "@/components/primitives/separator";
import { Dialog, DialogTrigger } from "@/components/primitives/dialog";
import { cn } from "@/utils/cn";
import CreateCore from "../CreateCore";

export default function SideBar() {
  const { isSidebarOpen } = useToggler();

  // TODO: Fetch All User Cores

  // TODO: Delete Later
  const cores = [
    "https://shiftart.com/wp-content/uploads/2017/04/RC-Profile-Square.jpg",
    "https://assets.mobileworldlive.com/wp-content/uploads/2015/10/16130048/Dorsey-iamge.png",
  ];

  return (
    // TODO: Check if User is Admin or PseudoAdmin
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 border-r border-white py-4 bg-gradient-to-r from-primary to-primary via-primary transition-all px-1",
        isSidebarOpen ? "w-48" : "w-24"
      )}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <CoreIcons
              isDrawerOpen={isSidebarOpen}
              heading="Add New Core"
              src="https://t4.ftcdn.net/jpg/01/26/10/59/360_F_126105961_6vHCTRX2cPOnQTBvx9OSAwRUapYTEmYA.jpg"
            />
          </button>
        </DialogTrigger>
        <CreateCore />
      </Dialog>

      <Separator className="h-[3px] w-[77%] bg-white rounded-full border" />

      <div className="flex-1 overflow-y-auto size-full flex flex-col px-4 gap-4">
        {[
          ...cores,
          ...cores,
          ...cores,
          ...cores,
          ...cores,
          ...cores,
          ...cores,
          ...cores,
        ].map((src, idx) => (
          <CoreIcons
            isDrawerOpen={isSidebarOpen}
            heading={`Batch ${idx + 2021}-${idx + 2025}`}
            src={src}
            key={idx}
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
  <button
    className={cn("flex gap-3 group justify-center items-center", className)}
  >
    <img
      className="size-14 rounded-full transition-all duration-300 group-hover:rounded-2xl"
      src={src}
      alt="core"
    />
    <span
      className={cn(
        "text-base text-center text-balance",
        isDrawerOpen ? "block" : "hidden"
      )}
    >
      {heading}
    </span>
  </button>
);
