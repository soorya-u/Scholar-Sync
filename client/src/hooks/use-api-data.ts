import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import {
  setApiData as setApiDataFn,
  resetApiData,
} from "@/redux/slices/api-data";
import { CoreType } from "@/types/api";

export const useApiData = () => {
  const apiData = useSelector((state: RootState) => state.apiData);

  const dispatch = useDispatch();
  return {
    apiData,
    setApiData: (data: CoreType[]) => dispatch(setApiDataFn(data)),
    resetApiData: () => dispatch(resetApiData()),
  };
};
