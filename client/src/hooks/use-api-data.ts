import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setApiData as setApiDataFn } from "@/redux/slices/api-data";
import { ApiDataType } from "@/types/redux";

export const useApiData = () => {
  const apiData = useSelector((state: RootState) => state.apiData);
  const dispatch = useDispatch();
  return {
    apiData,
    setApiData: (data: ApiDataType[]) => dispatch(setApiDataFn(data)),
  };
};
