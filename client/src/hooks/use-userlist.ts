import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleUserList } from "@/redux/slices/userlist";

export const useUserList = () => {
  const isUserListOpen = useSelector((state: RootState) => state.userList);
  const dispatch = useDispatch();
  return {
    isUserListOpen,
    toggleUserList: () => dispatch(toggleUserList()),
  };
};
