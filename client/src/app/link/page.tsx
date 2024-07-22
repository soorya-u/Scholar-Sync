"use client";

import Image from "next/image";
import Gradient from "@/components/custom/Gradient";
import { useLink } from "@/hooks/use-link";
import { useSearchParams } from "next/navigation";

export default function JoinPage() {
  useLink();
  const searchParams = useSearchParams();
  return (
    <>
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-2xl text-primary">Scholar Sync</h1>
        </div>
        <h1 className="text-center font-playwrite text-4xl text-amber-400 sm:text-5xl">
          Adding you to <br /> the requested
          {searchParams.get("a") === "c" ? "Core" : "Nexus"}....
        </h1>
      </div>
    </>
  );
}
