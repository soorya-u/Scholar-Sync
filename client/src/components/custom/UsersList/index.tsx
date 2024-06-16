import { useToggler } from "@/hooks/use-toggler";
import { cn } from "@/utils/cn";

export default function UsersList() {
  const { isUserListOpen } = useToggler();

  return (
    <div
      className={cn(
        " flex-col bg-secondary p-4 h-full w-[15rem] overflow-y-auto border-l border-white transition-all",
        isUserListOpen
          ? "translate-x-60 absolute right-0"
          : "translate-x-0 relative"
      )}
    >
      {/* Display PsuedoAdmin */}
      <div className="flex flex-col justify-center">
        <h2 className="text-lg">Creator - 1</h2>
        <div className="flex pl-3 items-center gap-2 py-2">
          <div className="size-8 flex justify-center items-center rounded-full bg-purple-400">
            <span>A</span>
          </div>
          <h3 className="text-base">Alia Bhatt</h3>
        </div>
      </div>
      <div>
        <h2 className="text-lg">Members - 69</h2>
        {Array(69)
          .fill(0)
          .map((_, idx) => (
            <div className="flex pl-3 items-center gap-2 py-2">
              <div className="size-8 flex justify-center items-center rounded-full bg-purple-400">
                <span>A</span>
              </div>
              <h3 className="text-base">Alia Bhatt {idx + 1}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
