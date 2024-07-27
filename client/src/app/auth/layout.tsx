import { PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";

import Gradient from "@/components/custom/Gradient";

export const metadata: Metadata = {
  description:
    "Authenication in Scholar Sync provides secure access for users ensuring a seamless entry into the platform's hierarchical system.",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <img src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-2xl text-primary">Scholar Sync</h1>
        </div>
        <Suspense>{children}</Suspense>
      </div>
    </>
  );
}
