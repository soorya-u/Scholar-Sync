import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/primitives/avatar";

import { AlignLeft, LogOut } from "lucide-react";

import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";

export default function Header() {
  const { toggleSidebar } = useToggler();
  const { user } = useUser();
  return (
    <div className="h-[8%] border-b border-border bg-background flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-10">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <AlignLeft className="text-foreground" />
        </button>
        <div className="flex justify-center items-center gap-3">
          <Avatar>
            <AvatarImage className="w-16" src="/logo.png" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-[Backpack] text-foreground">
            Scholar Sync
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="size-10 rounded-full flex justify-center items-center bg-purple-600">
          <span className="text-lg font-extrabold">{user.fullName[0]}</span>
        </div>
        <p className="text-base font-bold">{user.fullName}</p>
        {/* TODO: Add function to Logout */}
        <LogOut className="size-5 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
      </div>
    </div>
  );
}
