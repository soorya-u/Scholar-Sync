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
        "relative h-screen flex flex-col items-center gap-2 py-4 bg-primary rounded-tr-xl transition-all",
        isDrawerOpen ? "w-52" : "w-24"
      )}
    >
      {/* TODO: Logo */}
      <CoreIcons
        handleClick={() => setIsDrawerOpen((prev) => !prev)}
        heading="Scholar Sync"
        src="https://www.svgrepo.com/show/303500/react-1-logo.svg"
      />
      <hr className="w-3/4 border border-foreground" />
      <div className="flex-1 overflow-y-scroll size-full flex flex-col px-4 gap-4">
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
    <div className={cn("flex gap-2 items-center", className)}>
      <img
        className="size-14 rounded-full hover:rounded-2xl transition-all"
        src={src}
        alt="core"
      />
      <h3
        className={cn(
          "text-base flex-1 text-center transition-all text-wrap",
          isDrawerOpen ? "inline" : "hidden"
        )}
      >
        {heading}
      </h3>
    </div>
  </Link>
);
