import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setColor } from "@/redux/slices/color";

type ProfileColor = {
  backgroundColor: string;
  color: string;
};

export const useColor = (userId: string): ProfileColor | null => {
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color[userId]);

  useEffect(() => {
    if (!color) {
      dispatch(setColor(userId));
    }
  }, [color, userId, dispatch]);

  return color;
};

export default useColor;
