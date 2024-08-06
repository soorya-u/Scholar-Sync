"use client";

import { healthCheck } from "@/lib/axios";
import { useEffect } from "react";

export default function ServerHealthChecker() {
  useEffect(() => {
    healthCheck();
  }, []);
  return <></>;
}
