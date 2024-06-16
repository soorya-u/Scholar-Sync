import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/primitives/avatar";

import { AlignLeft } from "lucide-react";

import { useSidebar } from "@/hooks/use-sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="min-h-[8%] border-b border-b-white bg-primary flex justify-between px-8 items-center gap-4 w-full">
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
      <div></div>
    </div>
  );
}
