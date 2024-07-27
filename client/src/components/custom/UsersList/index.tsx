"use client";

import { DoorOpen } from "lucide-react";

import { useNexus } from "@/hooks/use-nexus";
import { useToggler } from "@/hooks/use-toggler";
import { useRemoveUser } from "@/hooks/use-remove";
import { cn } from "@/utils/cn";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/primitives/context-menu";
import CustomAvatar from "../CustomAvatar";

export default function UsersList() {
  const { isUserListOpen } = useToggler();
  const { nexus } = useNexus();
  const { handleClick: removeUserFn } = useRemoveUser();

  if (nexus.creator.id === "") return;

  return (
    <div
      className={cn(
        "hidden h-full w-[12rem] flex-col overflow-y-auto border-l border-border p-4 transition-all xs-sm:flex",
        isUserListOpen
          ? "absolute right-0 translate-x-60"
          : "relative translate-x-0",
      )}
    >
      <div className="flex flex-col justify-center">
        <h2 className="font-lato text-lg font-bold">Creator - 1</h2>
        <div className="flex items-center gap-2 py-2 pl-3">
          {nexus.creator && (
            <CustomAvatar
              className="size-8"
              textClassName="text-sm"
              id={nexus.creator.id}
              name={nexus.creator.fullName}
            />
          )}
          <h3 className="font-kanit text-lg">
            {nexus.creator && nexus.creator.fullName}
          </h3>
        </div>
      </div>
      <div>
        <h2 className="font-lato text-lg font-bold">
          Members - {nexus.users && nexus.users.length}
        </h2>
        {nexus.users &&
          nexus.users.map((user, idx) => {
            return (
              <ContextMenu key={idx}>
                <ContextMenuTrigger className="flex items-center gap-2 py-2 pl-3 cursor-pointer">
                  <CustomAvatar
                    id={user.id}
                    name={user.fullName}
                    className="size-8"
                    textClassName="text-sm"
                  />
                  <h3 className="font-kanit text-lg">{user.fullName}</h3>
                </ContextMenuTrigger>
                <ContextMenuContent className="ml-5 mt-4 flex flex-col bg-transparent backdrop-blur-md">
                  {user.userType !== "NORMAL" && (
                    <ContextMenuItem
                      onClick={async () =>
                        await removeUserFn(user.id, nexus.id)
                      }
                      className="flex justify-between cursor-pointer"
                    >
                      <p className="font-lato font-bold text-red-500">Remove</p>
                      <DoorOpen className="flex size-4 [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
      </div>
    </div>
  );
}
