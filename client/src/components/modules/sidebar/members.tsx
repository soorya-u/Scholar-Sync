import { useCallback, useMemo } from "react";
import { PlusIcon, UserRoundX, UserRoundPen, DoorOpen } from "lucide-react";

import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";
import { useUser } from "@/hooks/use-user";
import { useLeaveNexus } from "@/hooks/use-leave";
import { useRemoveCoreMember, useRemoveNexusMember } from "@/hooks/use-remove";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/user-avatar";
import InviteMemberModal from "../modals/invite";

import { type TUser } from "@/types/api";

import { ProfileType } from "@/generated/graphql";
import { cn } from "@/utils/cn";
import ConfirmModal from "../modals/confirm";

export default function Members() {
  const { isMobile } = useSidebar();

  const {
    user: { id: userId },
  } = useUser();

  const {
    nexus: { members: allNexusMembers, id: nexusId, userRole: nexusUserRole },
  } = useNexus();

  const {
    core: { members: allCoreMembers, id: coreId, userRole: coreUserRole },
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
      <SidebarGroupLabel>
        <div className="flex w-full items-center justify-between">
          <h5>Members</h5>
          <InviteMemberModal>
            <PlusIcon className="size-4" />
            <span className="sr-only">Invite new Member</span>
          </InviteMemberModal>
        </div>
      </SidebarGroupLabel>
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
              key={idx}
              className="divide-y-4 divide-transparent"
              value={idx === 0 ? "core" : "nexus"}
            >
              <MemberList
                tabValue={idx === 0 ? "core" : "nexus"}
                userId={userId}
                title="Admins"
                isMobile={isMobile}
                users={m.admins}
                isUserAdmin={
                  idx === 0
                    ? coreUserRole === ProfileType.Admin
                    : nexusUserRole === ProfileType.Admin
                }
              />
              <MemberList
                tabValue={idx === 0 ? "core" : "nexus"}
                userId={userId}
                title="Normal Members"
                isMobile={isMobile}
                users={m.normalMembers}
                isUserAdmin={
                  idx === 0
                    ? coreUserRole === ProfileType.Admin
                    : nexusUserRole === ProfileType.Admin
                }
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
  isMobile: boolean;
  isUserAdmin: boolean;
  tabValue: "core" | "nexus";
};

const MemberList = ({
  title,
  users,
  userId,
  isMobile,
  isUserAdmin,
  tabValue,
}: MemberListProp) => {
  const {
    core: { name: coreName, id: coreId },
  } = useCore();
  const {
    nexus: { name: nexusName, id: nexusId },
  } = useNexus();

  const { handleClick: removeFromCore } = useRemoveCoreMember();
  const { handleClick: removeFromNexus } = useRemoveNexusMember();
  const { handleClick: leaveFn } = useLeaveNexus();

  const removeUser = useCallback(
    async (userId: string) => {
      tabValue === "core"
        ? await removeFromCore(userId, coreId)
        : await removeFromNexus(userId, nexusId);
    },
    [coreId, nexusId, removeFromCore, removeFromNexus, tabValue],
  );

  return (
    users.length > 0 && (
      <div className="flex flex-col gap-1">
        <h2 className="font-kanit text-base text-gray-500">{title}</h2>
        <div className="flex flex-col gap-1">
          {users
            .sort((u) => (u.id === userId ? -1 : 1))
            .map((u) => (
              <div
                key={u.id}
                className="group/user flex flex-1 items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-500/5"
              >
                <UserAvatar
                  id={u.id}
                  name={u.fullName}
                  className="size-6"
                  textClassName="text-xs"
                />
                <span className="flex-1 cursor-default font-kanit text-[14px]">
                  {u.fullName}{" "}
                  <span className="text-[12px]">
                    {u.id === userId && "(You)"}
                  </span>
                </span>
                {isUserAdmin && u.id !== userId && (
                  <div
                    className={cn(
                      isMobile
                        ? "visible flex gap-2"
                        : "invisible flex gap-2 group-hover/user:visible",
                    )}
                  >
                    <span>
                      <UserRoundPen className="size-4 cursor-pointer" />
                      <span className="sr-only">Edit User Role</span>
                    </span>
                    <ConfirmModal
                      title={`Remove User From ${tabValue} ${tabValue === "core" ? coreName : nexusName}`}
                      description={`Are you sure you want to Remove ${u.fullName} From ${tabValue} ${tabValue === "core" ? coreName : nexusName}`}
                      actionTitle="Remove"
                      completeFn={() => removeUser(u.id)}
                      fnActionType="destructive"
                    >
                      <>
                        <UserRoundX className="size-4 cursor-pointer text-red-500" />
                        <span className="sr-only">Remove User</span>
                      </>
                    </ConfirmModal>
                  </div>
                )}
                {tabValue === "nexus" && u.id === userId && (
                  <div
                    className={cn(
                      isMobile
                        ? "visible flex gap-2"
                        : "invisible flex gap-2 group-hover/user:visible",
                    )}
                  >
                    <ConfirmModal
                      title={`Leave From Nexus ${nexusName}`}
                      description={`Are you sure you want to Leave Nexus ${nexusName}`}
                      actionTitle="Leave"
                      completeFn={() => leaveFn(nexusId)}
                      fnActionType="destructive"
                    >
                      <>
                        <DoorOpen className="size-4 cursor-pointer text-red-500" />
                        <span className="sr-only">Leave {tabValue}</span>
                      </>
                    </ConfirmModal>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  );
};
