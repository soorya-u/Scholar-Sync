import { ChevronsUpDown, Plus } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCore } from "@/hooks/use-core";
import CreateCoreModal from "../modals/core";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function CoreSwitcher({
  cores,
}: {
  cores: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
}) {
  const { isMobile } = useSidebar();

  const { core: activeCore, setCoreById } = useCore();

  if (!activeCore.id)
    return (
      <SidebarMenu className="gap-2 mb-3">
        <SidebarMenuItem className="ml-2 mt-2">
          <SidebarMenuButton
            asChild
            size="lg"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <CreateCoreModal>
              <div className="flex size-7 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <span className="truncate text-sm font-semibold leading-tight">
                Add new Core
              </span>
            </CreateCoreModal>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu className="gap-2">
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger className="disabled:opacity-100" asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center bg-transparent text-sidebar-primary-foreground">
                  <img
                    src={activeCore.imageUrl}
                    className="size-full rounded-lg border-2 border-primary"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeCore.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Cores
              </DropdownMenuLabel>
              {cores.map((core) => (
                <DropdownMenuItem
                  key={core.id}
                  onClick={async () => await setCoreById(core.id)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center">
                    <img
                      src={core.imageUrl}
                      className="size-full rounded-md border-2 border-primary"
                    />
                  </div>
                  {core.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <DialogTrigger className="flex items-center justify-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add new Core
                  </div>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateCoreModal withoutWrapperAndTrigger />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
