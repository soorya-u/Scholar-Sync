import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setNexus as setNexusFn, resetNexus } from "@/redux/slices/nexus";
import { useGetNexusLazyQuery } from "@/generated/graphql";

export const useNexus = () => {
  const nexus = useSelector((state: RootState) => state.nexus);
  const dispatch = useDispatch();
  const [query, { loading }] = useGetNexusLazyQuery({
    onCompleted: (data) => {
      if (!data || !data.getNexus) return;
      const nexus = data.getNexus;
      const members = nexus.members.filter((m) => !!m) || [];
      const files = nexus.files.filter((f) => !!f) || [];
      const announcements = nexus.announcements.filter((a) => !!a) || [];
      dispatch(setNexusFn({ ...nexus, members, files, announcements }));
    },
  });

  const setNexusById = async (nexusId: string) =>
    await query({ variables: { nexusId } });

  return {
    nexus,
    setNexusById,
    resetNexus: () => dispatch(resetNexus()),
    loading,
  };
};
