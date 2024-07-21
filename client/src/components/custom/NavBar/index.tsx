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
    <div className="flex h-[9%] w-full items-center justify-center border-b border-border px-2 2xs:justify-between 2xs:px-5">
      <div className="flex items-center justify-center">
        {/* TODO: Add core, nexus, category check */}
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer font-kanit text-lg">
                {core.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer font-kanit text-lg">
                {nexus.category}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer font-kanit text-lg">
                {nexus.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="hidden items-center justify-center gap-6 2xs:flex">
        <button className="hidden xs-sm:flex" onClick={toggleUserList}>
          <Users className="size-6" />
        </button>
        {/* TODO: Generate Link using Core and Nexus */}
        {user.userType !== "NORMAL" && <Share2 className="size-6" />}
        {/* TODO: Add Functionality */}
        {user.userType === "NORMAL" && (
          <DoorOpen className="size-7 [&>path]:text-red-500/70" />
        )}
        {/* TODO: Add Functionality */}
        {user.userType !== "NORMAL" && (
          <Trash2 className="size-6 [&>line]:text-red-500/70 [&>path]:text-red-500/70" />
        )}
      </div>
    </div>
  );
}
