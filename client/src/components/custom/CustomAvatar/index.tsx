"use client";

import { cn } from "@/utils/cn";
import { getProfileColor } from "@/utils/colors";

export default function CustomAvatar({
  id,
  name,
  className,
  textClassName,
}: {
  id: string;
  name: string;
  className?: string;
  textClassName?: string;
}) {
  const { backgroundColor, color } = getProfileColor(id);

  return (
    <div
      style={{ backgroundColor }}
      className={cn(
        "flex size-10 items-center justify-center rounded-full",
        className,
      )}
    >
      <span
        style={{ color }}
        className={cn("font-playwrite text-lg", textClassName)}
      >
        {name[0]}
      </span>
    </div>
  );
}
