import { PropsWithChildren } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import SideBar from "../SideBar";
import NexusList from "../NexusList";
import { useUser } from "@/hooks/use-user";

export default function Drawer({ children }: PropsWithChildren) {
  const { user } = useUser();
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[78vw] bg-primary p-0" side={"left"}>
        <h1 className="pb-2 pl-6 pt-2 font-playwrite text-base text-foreground">
          Scholar Sync
        </h1>
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          {user.userType !== "NORMAL" && (
            <div className="relative flex h-full w-28 flex-col items-center gap-2 border-r border-border py-4 transition-all duration-300">
              <SideBar />
            </div>
          )}

          <div className="flex h-full flex-1 flex-col items-center gap-3 border-r border-border px-2 py-4 transition-all duration-300">
            <NexusList />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
