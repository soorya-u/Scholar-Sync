import { ChevronRight, type LucideIcon } from "lucide-react";

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


type CategoryProps = {
  categories: {
    name: string;
    nexus: { id: string; name: string }[];
  }[];
};

export default function CategoriesList({ categories }: CategoryProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Categories</SidebarGroupLabel>
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
                  <span>{category.name} Semester</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {category.nexus.map((n) => (
                    <SidebarMenuSubItem key={n.id}>
                      <SidebarMenuSubButton
                        onClick={() => console.log("set active nexus")}
                      >
                        <span>{n.name}</span>
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
