import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setCore as setCoreFn, resetCore } from "@/redux/slices/core";

import { useGetCoreLazyQuery } from "@/generated/graphql";

export const useCore = () => {
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const [query, { loading }] = useGetCoreLazyQuery({
    onCompleted: (data) => {
      if (!data || !data.getCore) return;
      const core = data.getCore;
      const members = core.members.filter((m) => !!m) ?? [];
      dispatch(setCoreFn({ ...core, members }));
    },
  });

  const setCoreById = async (coreId: string) =>
    await query({ variables: { coreId } });

  return {
    core,
    setCoreById,
    resetCore: () => dispatch(resetCore()),
    loading,
  };
};
