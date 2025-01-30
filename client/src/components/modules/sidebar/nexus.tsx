import { useEffect, useRef, useState } from "react";
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
            <span className="sr-only">Add new Nexus</span>
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
                    <SideItem
                      key={n.id}
                      activeNexusId={nexus.id}
                      nexus={n}
                      onClick={async () => await setNexusById(n.id)}
                    />
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

type SideItemProps = {
  nexus: {
    id: string;
    name: string;
  };
  onClick: () => Promise<any>;
  activeNexusId: string;
};

const SideItem = ({ nexus, onClick, activeNexusId }: SideItemProps) => {
  const { isMobile } = useSidebar();
  const itemRef = useRef<HTMLLIElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownHovering, setIsDropdownHovering] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!itemRef || !itemRef.current || !dropdownRef || !dropdownRef.current)
      return;

    const handleItemMouseLeave = () =>
      !isDropdownHovering && isMenuOpen && setIsMenuOpen(false);

    const handleDropdownMouseLeave = () => isMenuOpen && setIsMenuOpen(false);

    itemRef.current.addEventListener("mouseleave", handleItemMouseLeave, {
      signal,
    });

    dropdownRef.current.addEventListener(
      "mouseleave",
      handleDropdownMouseLeave,
      { signal },
    );

    return () => controller.abort();
  }, [isMenuOpen, isDropdownHovering]);

  return (
    <SidebarMenuSubItem
      className="group/sub flex items-center justify-between"
      ref={itemRef}
    >
      <SidebarMenuSubButton className="flex flex-1 cursor-pointer items-center">
        <button
          onClick={onClick}
          className={cn(
            "flex-1 text-left",
            nexus.id === activeNexusId && "font-semibold",
          )}
        >
          {nexus.name}
        </button>
        <DropdownMenu
          open={isMenuOpen}
          onOpenChange={(val) => setIsMenuOpen(val)}
        >
          <DropdownMenuTrigger
            ref={triggerRef}
            className={cn(
              isMobile ? "visible" : "invisible group-hover/sub:visible",
            )}
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            ref={dropdownRef}
            onMouseEnter={() => setIsDropdownHovering(true)}
            onMouseLeave={() => setIsDropdownHovering(false)}
            className="w-48 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
          >
            <DropdownMenuItem className="flex items-center justify-start gap-2">
              <Folder className="size-4 text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-start gap-2">
              <Forward className="size-4 text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-start gap-2">
              <Trash2 className="size-4 text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
