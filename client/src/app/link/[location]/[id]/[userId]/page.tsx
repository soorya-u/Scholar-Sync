"use client";

import React from "react";
import Gradient from "@/components/custom/Gradient";
import { useLink } from "@/hooks/use-link";

export default function JoinPage({ params }: { params: { location: string } }) {
  useLink();
  return (
    <>
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <img src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-2xl text-primary">Scholar Sync</h1>
        </div>
        <h1 className="text-wrap text-center font-playwrite text-4xl leading-[3.5rem] text-amber-400 sm:text-5xl">
          Adding you to the requested
          {params.location === "c" ? "Core" : "Nexus"}....
        </h1>
      </div>
    </>
  );
}
