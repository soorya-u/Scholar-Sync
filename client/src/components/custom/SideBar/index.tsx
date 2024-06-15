import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        "relative flex flex-col items-center gap-2 py-4 bg-primary rounded-tr-xl transition-all",
        isDrawerOpen ? "w-48" : "w-24"
      )}
    >
      {/* TODO: Logo */}

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
            isDrawerOpen={isDrawerOpen}
            heading={`Batch ${idx + 2021}-${idx + 2025}`}
            src={src}
            key={idx}
          />
        ))}
        <CoreIcons
          isDrawerOpen={isDrawerOpen}
          heading="Add New Core"
          src="https://t4.ftcdn.net/jpg/01/26/10/59/360_F_126105961_6vHCTRX2cPOnQTBvx9OSAwRUapYTEmYA.jpg"
        />
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
