import { useNexus } from "@/hooks/use-nexus";
import { useToggler } from "@/hooks/use-toggler";
import { cn } from "@/utils/cn";
import CustomAvatar from "../CustomAvatar";

export default function UsersList() {
  const { isUserListOpen } = useToggler();
  const { nexus } = useNexus();

  return (
    <div
      className={cn(
        " flex-col p-4 h-full w-[12rem] overflow-y-auto border-l border-border  transition-all",
        isUserListOpen
          ? "translate-x-60 absolute right-0"
          : "translate-x-0 relative"
      )}
    >
      {/* TODO: Display PsuedoAdmin */}
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-lato font-bold">Creator - 1</h2>
        <div className="flex pl-3 items-center gap-2 py-2">
          {nexus.creator && (
            <CustomAvatar
              className="size-8"
              textClassName="text-sm"
              name={nexus.creator.fullName}
            />
          )}
          <h3 className="text-lg font-kanit">
            {nexus.creator && nexus.creator.fullName}
          </h3>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-lato font-bold">
          Members - {nexus.users && nexus.users.length}
        </h2>
        {nexus.users &&
          nexus.users.map((user, idx) => {
            return (
              <div key={idx} className="flex pl-3 items-center gap-2 py-2">
                <CustomAvatar
                  name={user.fullName}
                  className="size-8"
                  textClassName="text-sm"
                />
                <h3 className="text-lg font-kanit">{user.fullName}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}
