import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Frame, Map, PieChart } from "lucide-react";

import CoreSwitcher from "./cores";
import CategoriesList from "./nexus";
import NavProjects from "./members";
import NavUser from "./user";
import { useTree } from "@/hooks/use-tree";
import { useMemo } from "react";
import { useCore } from "@/hooks/use-core";

const categoryNames = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
];

export default function Sidebar() {
  const { tree } = useTree();
  const { core } = useCore();

  const cores = useMemo(() => tree.map(({ nexus, ...rest }) => rest), [tree]);

  const categories = useMemo(() => {
    const activeCore = tree.find((t) => t.id === core.id);
    return categoryNames.map((c) => {
      const categoryNexus = !!activeCore
        ? activeCore.nexus.filter((n) => n.category === c)
        : [];
      return { name: c, nexus: categoryNexus };
    });
  }, [tree, core]);

  return (
    <UISidebar collapsible="offcanvas">
      <SidebarHeader>
        <CoreSwitcher cores={cores} />
      </SidebarHeader>
      <SidebarContent>
        <CategoriesList categories={categories} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}

const projects = [
  {
    name: "Design Engineering", 
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];
