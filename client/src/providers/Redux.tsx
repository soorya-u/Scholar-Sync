import { PropsWithChildren } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function ReduxProvider(props: PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}
