import { useMemo } from "react";

import { useTree } from "@/hooks/use-tree";
import { useCore } from "@/hooks/use-core";

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import CoreSwitcher from "./cores";
import CategoriesList from "./nexus";
import Members from "./members";
import NavUser from "./user";

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
        <Members />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
