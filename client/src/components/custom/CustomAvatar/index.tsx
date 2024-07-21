"use client";

import { cn } from "@/utils/cn";
import { useColor } from "@/hooks/use-color";

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
  const c = useColor(id);

  if (!c) {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-sky-400",
          className,
        )}
      >
        <span
          className={cn("font-playwrite text-lg text-black", textClassName)}
        >
          {name[0]}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: c.backgroundColor }}
      className={cn(
        "flex size-10 items-center justify-center rounded-full",
        className,
      )}
    >
      <span
        style={{ color: c.color }}
        className={cn("font-playwrite text-lg", textClassName)}
      >
        {name[0]}
      </span>
    </div>
  );
}
