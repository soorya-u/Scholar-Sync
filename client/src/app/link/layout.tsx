import React, { PropsWithChildren } from "react";

export default function LinkLayout(props: PropsWithChildren) {
  return <React.Suspense>{props.children}</React.Suspense>;
}
