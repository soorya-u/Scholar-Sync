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
          "size-10 rounded-full flex justify-center items-center bg-sky-400",
          className
        )}
      >
        <span
          className={cn("text-lg font-playwrite text-black", textClassName)}
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
        "size-10 rounded-full flex justify-center items-center",
        className
      )}
    >
      <span
        style={{ color: c.color }}
        className={cn("text-lg font-playwrite", textClassName)}
      >
        {name[0]}
      </span>
    </div>
  );
}
