"use client";

import {
  AlignLeft,
  LogOut,
  ChevronDown,
  Trash2,
  Share2,
  DoorOpen,
} from "lucide-react";

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
import CustomAvatar from "../CustomAvatar";
import Drawer from "../Drawer";

export default function Header() {
  const { toggleSidebar } = useToggler();
  const { user } = useUser();

  return (
    <div className="h-[8%] border-b border-border flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-4">
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
          <h1 className="text-2xl hidden font-playwrite text-foreground xs-sm:block">
            Scholar Sync
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="justify-center items-center gap-2 hidden 2xs:flex">
          <CustomAvatar
            id={user.id}
            className="size-8"
            textClassName="text-sm"
            name={user.fullName}
          />
          <p className="text-lg font-kanit">{user.fullName}</p>
        </div>
        <div className="justify-center items-center gap-2 flex 2xs:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-center items-center gap-2">
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
              <DropdownMenuLabel className="font-kanit text-base py-1">
                {user.fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* TODO: Generate Link using Core and Nexus */}
              {user.userType !== "NORMAL" && (
                <DropdownMenuItem className="flex justify-between">
                  <p className="text-foreground">Share</p>
                  <Share2 className="flex 2xs:hidden size-4 [&>path]:text-foreground [&>line]:text-foreground [&>polyline]:text-foreground" />
                </DropdownMenuItem>
              )}
              {user.userType === "NORMAL" && (
                <DropdownMenuItem className="flex justify-between">
                  <p className="text-red-500">Leave</p>
                  <DoorOpen className="flex 2xs:hidden size-4 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
                </DropdownMenuItem>
              )}
              {user.userType !== "NORMAL" && (
                <DropdownMenuItem className="flex justify-between">
                  <p className="text-red-500">Delete</p>
                  <Trash2 className="flex 2xs:hidden size-4 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="flex justify-between">
                <p className="text-red-500">Logout</p>
                <LogOut className="flex 2xs:hidden size-4 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* TODO: Add function to Logout */}
        <LogOut className="hidden 2xs:flex size-5 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
      </div>
    </div>
  );
}
