import { PropsWithChildren } from "react";

import Gradient from "@/components/custom/Gradient";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Gradient />
      <div className="min-h-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-playwrite text-primary">Scholar Sync</h1>
        </div>
        {children}
      </div>
    </>
  );
}
