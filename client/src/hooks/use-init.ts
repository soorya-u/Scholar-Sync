import { useRouter } from "next/navigation";

import { useTree } from "./use-tree";
import { useUser } from "./use-user";

import { TUserTree } from "@/types/api";

import { useGetCurrentUserQuery, useGetTreeQuery } from "@/generated/graphql";
import { useCore } from "./use-core";

export const useTreeInit = () => {
  const { setTree } = useTree();
  const { setCoreById } = useCore();

  const { refetch, loading } = useGetTreeQuery({
    onCompleted: ({ getTree }) => {
      const payload: TUserTree[] = getTree
        .map((d) => (!!d ? { ...d, nexus: d.nexus.filter((n) => !!n) } : null))
        .filter((p) => !!p);

      setTree(payload);
      if (payload.length > 0) setCoreById(payload[0].id);
    },
  });

  return { refetch, loading };
};

export const useUserInit = () => {
  const router = useRouter();

  const { setUser } = useUser();

  useGetCurrentUserQuery({
    onCompleted: ({ getUser }) => setUser(getUser),
    onError: () => router.replace("/auth/login"),
    fetchPolicy: "network-only",
  });
};
