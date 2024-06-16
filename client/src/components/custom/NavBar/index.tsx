import { Users, Share2, DoorOpen, MapPin, Trash2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/primitives/breadcrumb";

export default function NavBar() {
  return (
    <div className="w-full h-[9%] bg-secondary flex justify-between items-center px-8 border-b border-white">
      <div className="flex justify-center items-center">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <MapPin />
            <BreadcrumbItem>
              {/* TODO: Add Respective */}
              <BreadcrumbPage className="text-xl cursor-pointer">
                Core[0]
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* TODO: Add Respective */}
              <BreadcrumbPage className="text-xl cursor-pointer">
                Nexus[0]
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center items-center gap-6">
        {/* TODO: Add a Redux Slice */}
        <Users className="size-6" />
        {/* Generate Link using Core and Nexus */}
        <Share2 className="size-6" />
        {/* To Exit from Nexus: Normal Users */}
        <DoorOpen className="size-7 [&>path]:text-red-500/70" />
        {/* To Delete Nexus: PsuedoAdmins Users */}
        <Trash2 className="size-6 [&>path]:text-red-500/70 [&>line]:text-red-500/70" />
      </div>
    </div>
  );
}
