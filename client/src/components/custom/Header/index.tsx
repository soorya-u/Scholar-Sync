"use client";

import { AlignLeft, LogOut } from "lucide-react";

import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import CustomAvatar from "../CustomAvatar";
import Drawer from "../Drawer";

export default function Header() {
  const { toggleSidebar } = useToggler();
  const { user } = useUser();

  return (
    <div className="h-[8%] border-b border-border flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-10">
        <Drawer>
          <AlignLeft className="cursor-pointer text-foreground flex md-lg:hidden" />
        </Drawer>
        <button
          className="cursor-pointer hidden md-lg:flex"
          onClick={toggleSidebar}
        >
          <AlignLeft className="text-foreground" />
        </button>
        <div className="flex justify-center items-center gap-3">
          <img src="/logo.png" alt="logo" className="size-8" />
          <h1 className="text-2xl font-playwrite text-foreground hidden xs-sm:block">
            Scholar Sync
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <CustomAvatar
            id={user.id}
            className="size-8"
            textClassName="text-sm"
            name={user.fullName}
          />
          <p className="text-lg font-kanit hidden 2xs:flex">{user.fullName}</p>
        </div>
        {/* TODO: Add function to Logout */}
        <LogOut className="hidden 2xs:flex size-5 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
      </div>
    </div>
  );
}
