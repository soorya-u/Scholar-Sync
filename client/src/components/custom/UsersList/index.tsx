import { useNexus } from "@/hooks/use-nexus";
import { useToggler } from "@/hooks/use-toggler";
import { cn } from "@/utils/cn";

export default function UsersList() {
  const { isUserListOpen } = useToggler();
  const { nexus } = useNexus();

  return (
    <div
      className={cn(
        " flex-col bg-secondary p-4 h-full w-[12rem] overflow-y-auto border-l border-border  transition-all",
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
            <span>{nexus.creator && nexus.creator.fullName[0]}</span>
          </div>
          <h3 className="text-base">
            {nexus.creator && nexus.creator.fullName}
          </h3>
        </div>
      </div>
      <div>
        <h2 className="text-lg">
          Members - {nexus.users && nexus.users.length}
        </h2>
        {nexus.users &&
          nexus.users.map((user, idx) => (
            <div key={idx} className="flex pl-3 items-center gap-2 py-2">
              <div className="size-8 flex justify-center items-center rounded-full bg-purple-400">
                <span>{user.fullName[0]}</span>
              </div>
              <h3 className="text-base">{user.fullName}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
