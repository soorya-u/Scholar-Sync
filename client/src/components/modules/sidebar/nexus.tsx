import {
  ChevronRight,
  Folder,
  Forward,
  MoreHorizontal,
  PlusIcon,
  Trash2,
} from "lucide-react";

import { useNexus } from "@/hooks/use-nexus";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/utils/cn";

import CreateNexusModal from "../modals/nexus";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CategoryProps = {
  categories: {
    name: string;
    nexus: { id: string; name: string }[];
  }[];
};

export default function CategoriesList({ categories }: CategoryProps) {
  const { nexus, setNexusById } = useNexus();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex w-full items-center justify-between">
          <h5>Nexus</h5>
          <CreateNexusModal>
            <PlusIcon className="size-4" />
          </CreateNexusModal>
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((category) => (
          <Collapsible
            key={category.name}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={category.name}>
                  <span
                    className={cn(
                      category.name === nexus.category && "font-semibold",
                    )}
                  >
                    {category.name} Semester
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="mr-0 pr-0">
                  {category.nexus.map((n) => (
                    <SidebarMenuSubItem
                      className="group/sub flex items-center justify-between"
                      key={n.id}
                    >
                      <SidebarMenuSubButton
                        className="flex-1 cursor-pointer"
                        onClick={async () => await setNexusById(n.id)}
                      >
                        <span
                          className={cn(n.id === nexus.id && "font-semibold")}
                        >
                          {n.name}
                        </span>
                      </SidebarMenuSubButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="hidden group-hover/sub:block"
                          asChild
                        >
                          <SidebarMenuSubButton>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuSubButton>
                        </DropdownMenuTrigger>
                        <DropdownOptions />
                      </DropdownMenu>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const DropdownOptions = () => {
  const { isMobile } = useSidebar();
  return (
    <DropdownMenuContent
      className="w-48 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align={isMobile ? "end" : "start"}
    >
      <DropdownMenuItem className="flex justify-start items-center gap-2">
        <Folder className="text-muted-foreground size-4" />
        <span>View Project</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex justify-start items-center gap-2">
        <Forward className="text-muted-foreground size-4" />
        <span>Share Project</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex justify-start items-center gap-2">
        <Trash2 className="text-muted-foreground size-4" />
        <span>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
