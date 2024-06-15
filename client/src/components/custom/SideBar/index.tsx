import { Link } from "@tanstack/react-router";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/utils/cn";
import { Separator } from "@/components/primitives/separator";

export default function NavBar() {
  const { isSidebarOpen } = useSidebar();

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
        "relative flex flex-col items-center gap-2 py-4 bg-primary transition-all border-r border-white px-1",
        isSidebarOpen ? "w-48" : "w-24"
      )}
    >
      <CoreIcons
        isDrawerOpen={isSidebarOpen}
        heading="Add New Core"
        src="https://t4.ftcdn.net/jpg/01/26/10/59/360_F_126105961_6vHCTRX2cPOnQTBvx9OSAwRUapYTEmYA.jpg"
      />

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
  handleClick,
  isDrawerOpen,
}: {
  className?: string;
  src: string;
  heading: string;
  handleClick?: () => void;
  isDrawerOpen?: boolean;
}) => (
  <Link onClick={handleClick}>
    <div
      className={cn("flex gap-3 group justify-center items-center", className)}
    >
      <img
        className="size-14 rounded-full transition-all duration-300 group-hover:rounded-2xl"
        src={src}
        alt="core"
      />
      <p
        className={cn(
          "text-base text-center text-balance",
          isDrawerOpen ? "block" : "hidden"
        )}
      >
        {heading}
      </p>
    </div>
  </Link>
);
