"use client";

import React, { PropsWithChildren } from "react";
import { useCheckUserAuth } from "@/hooks/use-auth";

import Gradient from "@/components/custom/Gradient";

export default function AuthLayout({ children }: PropsWithChildren) {
  useCheckUserAuth();
  return (
    <>
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <img src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-2xl text-primary">Scholar Sync</h1>
        </div>
        <React.Suspense>{children}</React.Suspense>
      </div>
    </>
  );
}
