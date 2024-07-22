"use client";

import { AlignLeft, LogOut, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";

import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import { useLogOut } from "@/hooks/use-auth";
import CustomAvatar from "../CustomAvatar";
import Drawer from "../Drawer";

export default function Header() {
  const { toggleSidebar } = useToggler();
  const { user } = useUser();
  const { handleClick: logOut } = useLogOut();

  return (
    <div className="flex h-[8%] w-full items-center justify-between gap-4 border-b border-border px-8">
      <div className="flex items-center justify-center gap-4">
        <Drawer>
          <AlignLeft className="flex cursor-pointer text-foreground md-lg:hidden" />
        </Drawer>
        <button
          className="hidden cursor-pointer md-lg:flex"
          onClick={toggleSidebar}
        >
          <AlignLeft className="text-foreground" />
        </button>
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.png" alt="logo" className="size-8" />
          <h1 className="hidden font-playwrite text-2xl text-foreground xs-sm:block">
            Scholar Sync
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="hidden items-center justify-center gap-2 2xs:flex">
          <CustomAvatar
            id={user.id}
            className="size-8"
            textClassName="text-sm"
            name={user.fullName}
          />
          <p className="font-kanit text-lg">{user.fullName}</p>
        </div>
        <div className="flex items-center justify-center gap-2 2xs:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center gap-2">
                <CustomAvatar
                  id={user.id}
                  className="size-8"
                  textClassName="text-sm"
                  name={user.fullName}
                />
                <ChevronDown className="size-4 [&_path]:text-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 mt-1">
              <DropdownMenuLabel className="py-1 font-kanit text-base">
                {user.fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => await logOut()}
                className="flex justify-between"
              >
                <p className="font-lato font-bold text-red-500">Logout</p>
                <LogOut className="flex size-4 2xs:hidden [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button onClick={async () => await logOut()}>
          <LogOut className="hidden size-5 2xs:flex [&>line]:text-red-500 [&>path]:text-red-500 [&>polyline]:text-red-500" />
        </button>
      </div>
    </div>
  );
}
