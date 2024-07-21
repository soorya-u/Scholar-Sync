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
        {core.name && nexus.category && nexus.name && (
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
        )}
      </div>
      <div className="hidden items-center justify-center gap-6 2xs:flex">
        <button className="hidden xs-sm:flex" onClick={toggleUserList}>
          <Users className="size-6" />
        </button>
      </div>
    </div>
  );
}
