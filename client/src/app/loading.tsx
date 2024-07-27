import { Loader } from "lucide-react";
import Gradient from "@/components/custom/Gradient";

export default function RootLoadingPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-black/40">
      <Gradient />
      <div className="absolute flex items-center justify-center gap-2">
        <img src={"/logo.png"} alt="Logo" width={60} height={60} />
      </div>
      <div className="absolute">
        <Loader
          style={{ animationDuration: "2s" }}
          className="size-48 animate-spin [&_path]:text-primary"
        />
      </div>
    </main>
  );
}
