import Gradient from "./gradient";
import { Loader as LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex-1 flex justify-center items-center bg-black/10">
      <Gradient />
      <div className="absolute flex items-center justify-center gap-2">
        <img src={"/logo.png"} alt="Logo" width={60} height={60} />
      </div>
      <div className="absolute">
        <LoaderIcon
          style={{ animationDuration: "2s" }}
          className="size-48 animate-spin [&_path]:text-primary"
        />
      </div>
    </div>
  );
}
