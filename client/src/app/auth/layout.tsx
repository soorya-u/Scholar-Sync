import { PropsWithChildren } from "react";

import Gradient from "@/components/custom/Gradient";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-2xl text-primary">Scholar Sync</h1>
        </div>
        {children}
      </div>
    </>
  );
}
