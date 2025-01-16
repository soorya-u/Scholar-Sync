import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setUser as setUserFn, resetUser } from "@/redux/slices/user";
import { TUser } from "@/types/api";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return {
    user,
    setUser: (user: TUser) => dispatch(setUserFn(user)),
    resetUser: () => dispatch(resetUser()),
  };
};
