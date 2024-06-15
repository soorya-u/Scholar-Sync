import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/slices/sidebar";

export const useSidebar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  return {
    isSidebarOpen,
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
};
