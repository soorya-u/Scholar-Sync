import { useMemo } from "react";

import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";
import { useUser } from "@/hooks/use-user";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "@/components/user-avatar";

import { type TUser } from "@/types/api";

import { ProfileType } from "@/generated/graphql";

export default function Members() {
  const {
    user: { id: userId },
  } = useUser();

  const {
    nexus: { members: allNexusMembers, id: nexusId },
  } = useNexus();

  const {
    core: { members: allCoreMembers, id: coreId },
  } = useCore();

  const coreMembers = useMemo(
    () => ({
      admins: allCoreMembers.filter((m) => m.role === ProfileType.Admin),
      normalMembers: allCoreMembers.filter(
        (m) => m.role === ProfileType.Normal,
      ),
    }),
    [allCoreMembers],
  );

  const nexusMembers = useMemo(
    () => ({
      admins: allNexusMembers.filter((m) => m.role === ProfileType.Admin),
      normalMembers: allNexusMembers.filter(
        (m) => m.role === ProfileType.Normal,
      ),
    }),
    [allNexusMembers],
  );

  if (coreId === "") return;

  return (
    <SidebarGroup className="flex-1 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Members</SidebarGroupLabel>
      <SidebarMenu>
        <Tabs defaultValue="core" className="w-full">
          <TabsList className="sticky top-0 w-full rounded-none bg-[#F6F6F6]">
            <TabsTrigger className="flex-1" value="core">
              Core
            </TabsTrigger>
            <TabsTrigger
              disabled={nexusId === ""}
              className="flex-1"
              value="nexus"
            >
              Nexus
            </TabsTrigger>
          </TabsList>
          {[coreMembers, nexusMembers].map((m, idx) => (
            <TabsContent
              className="divide-y-4 divide-transparent"
              value={idx === 0 ? "core" : "nexus"}
            >
              <MemberList userId={userId} title="Admins" users={m.admins} />
              <MemberList
                userId={userId}
                title="Normal Members"
                users={m.normalMembers}
              />
            </TabsContent>
          ))}
        </Tabs>
      </SidebarMenu>
    </SidebarGroup>
  );
}

type MemberListProp = {
  title: string;
  users: (TUser & { role: ProfileType })[];
  userId: string;
};

const MemberList = ({ title, users, userId }: MemberListProp) =>
  users.length > 0 && (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <div className="ml-2 flex flex-col gap-2">
        {users
          .sort((u) => (u.id === userId ? -1 : 1))
          .map((u) => (
            <div className="flex items-center gap-2">
              <UserAvatar
                id={u.id}
                name={u.fullName}
                className="size-6"
                textClassName="text-xs"
              />
              <span className="text text-[14px]">
                {u.fullName}{" "}
                <span className="text-[12px]">
                  {u.id === userId && "(You)"}
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
