import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/primitives/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/primitives/breadcrumb";
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
          <h1 className="text-2xl"></h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base cursor-pointer">
                  Scholar Sync
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* TODO: Add Respective */}
                <BreadcrumbPage className="text-base cursor-pointer">
                  Core
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* TODO: Add Respective */}
                <BreadcrumbPage className="text-base cursor-pointer">
                  Nexus
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div></div>
    </div>
  );
}
