import { cn } from "@/utils/cn";
import { getProfileColor } from "@/utils/colors";

export default function CustomAvatar({
  name,
  className,
  textClassName,
}: {
  name: string;
  className?: string;
  textClassName?: string;
}) {
  const { backgroundColor, color } = getProfileColor();
  return (
    <div
      style={{ backgroundColor }}
      className={cn(
        "size-10 rounded-full flex justify-center items-center",
        className
      )}
    >
      <span
        style={{ color }}
        className={cn("text-lg font-playwrite", textClassName)}
      >
        {name[0]}
      </span>
    </div>
  );
}
