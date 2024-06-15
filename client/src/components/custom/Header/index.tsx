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

export default function Header() {
  return (
    <div className="min-h-[8%] border-b border-b-white bg-secondary/40 flex justify-between px-8 items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-20">
        <button className="cursor-pointer">
          <AlignLeft />
        </button>
        <div className="flex justify-center items-center gap-4">
          <Avatar>
            <AvatarImage
              className="w-16"
              src="https://belief.soorya-u.dev/logo.png"
            />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl">Scholar Sync</h1>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base cursor-pointer">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* TODO: Add Respective */}
              <BreadcrumbPage className="text-base cursor-pointer">Core</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* TODO: Add Respective */}
              <BreadcrumbPage className="text-base cursor-pointer">Nexus</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div></div>
    </div>
  );
}
