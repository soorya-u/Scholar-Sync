import { PropsWithChildren } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/primitives/sheet";

import SideBar from "../SideBar";
import NexusList from "../NexusList";

export default function Drawer({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[78vw] p-0 pt-10 bg-primary" side={"left"}>
        <div className="w-full bg-secondary h-full flex justify-center items-center">
          <div className="flex flex-col w-28 h-full relative items-center gap-2 border-r border-border py-4 transition-all duration-300">
            <SideBar />
          </div>

          <div className="flex flex-1 h-full flex-col py-4 gap-3 items-center px-2 border-r border-border transition-all duration-300">
            <NexusList />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
