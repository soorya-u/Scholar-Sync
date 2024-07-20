import { Users, Share2, DoorOpen, Trash2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/primitives/breadcrumb";
import { useToggler } from "@/hooks/use-toggler";
import { useUser } from "@/hooks/use-user";
import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";

export default function NavBar() {
  const { toggleUserList } = useToggler();
  const { user } = useUser();
  const { core } = useCore();
  const { nexus } = useNexus();

  return (
    <div className="w-full h-[9%] flex justify-between items-center px-5  border-b border-border">
      <div className="flex justify-center items-center">
        {/* TODO: Add core, nexus, category check */}
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-kanit cursor-pointer">
                {core.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-kanit cursor-pointer">
                {nexus.category}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-kanit cursor-pointer">
                {nexus.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center items-center gap-6">
        <button className="hidden xs-sm:flex" onClick={toggleUserList}>
          <Users className="size-6" />
        </button>
        {/* TODO: Generate Link using Core and Nexus */}
        {user.userType !== "NORMAL" && <Share2 className="size-6  hidden 2xs:flex" />}
        {/* TODO: Add Functionality */}
        {user.userType === "NORMAL" && (
          <DoorOpen className="size-7 [&>path]:text-red-500/70  hidden 2xs:flex" />
        )}
        {/* TODO: Add Functionality */}
        {user.userType !== "NORMAL" && (
          <Trash2 className="size-6 [&>path]:text-red-500/70 [&>line]:text-red-500/70  hidden 2xs:flex" />
        )}
      </div>
    </div>
  );
}
