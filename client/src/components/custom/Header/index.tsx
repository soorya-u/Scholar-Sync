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
    <div className="h-[8%] border-b border-b-white bg-primary flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-10">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <AlignLeft />
        </button>
        <div className="flex justify-center items-center gap-2">
          <Avatar>
            <AvatarImage
              className="w-16"
              src="https://belief.soorya-u.dev/logo.png"
            />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl">Scholar Sync</h1>
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
