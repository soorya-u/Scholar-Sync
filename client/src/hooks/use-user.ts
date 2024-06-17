import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setUser as setUserFn } from "@/redux/slices/user";
import { UserType } from "@/types/redux";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return {
    user,
    setUser: (user: UserType) => dispatch(setUserFn(user)),
  };
};
