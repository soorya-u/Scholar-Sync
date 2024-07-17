import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/primitives/avatar";

import { AlignLeft, LogOut } from "lucide-react";

import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import { getProfileColor } from "@/utils/colors";
import CustomAvatar from "../CustomAvatar";

export default function Header() {
  const { toggleSidebar } = useToggler();
  const { user } = useUser();
  const { backgroundColor, color } = getProfileColor();
  return (
    <div className="h-[8%] border-b border-border flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-10">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <AlignLeft className="text-foreground" />
        </button>
        <div className="flex justify-center items-center gap-3">
          <Avatar>
            <AvatarImage className="w-16" src="/logo.png" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-playwrite text-foreground">
            Scholar Sync
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <CustomAvatar
            className="size-8"
            textClassName="text-sm"
            name={user.fullName}
          />
          <p className="text-lg font-kanit">{user.fullName}</p>
        </div>
        {/* TODO: Add function to Logout */}
        <LogOut className="size-5 [&>path]:text-red-500 [&>line]:text-red-500 [&>polyline]:text-red-500" />
      </div>
    </div>
  );
}
