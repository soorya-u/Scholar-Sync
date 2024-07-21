import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar as toggleSidebarFn,
  toggleUserList as toggleUserListFn,
} from "@/redux/slices/toggler";

export const useToggler = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.toggler.sidebar,
  );
  const isUserListOpen = useSelector(
    (state: RootState) => state.toggler.userList,
  );
  const dispatch = useDispatch();
  return {
    isSidebarOpen,
    isUserListOpen,
    toggleSidebar: () => dispatch(toggleSidebarFn()),
    toggleUserList: () => dispatch(toggleUserListFn()),
  };
};
