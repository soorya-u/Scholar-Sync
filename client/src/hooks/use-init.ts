import { useRouter } from "next/navigation";

import { useTree } from "./use-tree";
import { useUser } from "./use-user";

import { TUserTree } from "@/types/api";

import { useGetCurrentUserQuery, useGetTreeQuery } from "@/generated/graphql";

export const useTreeInit = () => {
  const { setTree } = useTree();

  const { refetch, loading } = useGetTreeQuery({
    onCompleted: ({ getTree }) => {
      const payload: TUserTree[] = getTree
        .map((d) => (!!d ? { ...d, nexus: d.nexus.filter((n) => !!n) } : null))
        .filter((p) => !!p);

      setTree(payload);
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
