import { ChevronRight, PlusIcon } from "lucide-react";

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
} from "@/components/ui/sidebar";

import { cn } from "@/utils/cn";
import CreateNexusModal from "../modals/nexus";

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
                <SidebarMenuSub>
                  {category.nexus.map((n) => (
                    <SidebarMenuSubItem key={n.id}>
                      <SidebarMenuSubButton
                        className="cursor-pointer"
                        onClick={async () => await setNexusById(n.id)}
                      >
                        <span
                          className={cn(n.id === nexus.id && "font-semibold")}
                        >
                          {n.name}
                        </span>
                      </SidebarMenuSubButton>
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
