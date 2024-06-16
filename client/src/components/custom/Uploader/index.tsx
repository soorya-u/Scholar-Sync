import { useRef, useState } from "react";
import {
  ChevronUp,
  Upload,
  MessageSquarePlus,
  FilePlus,
  FilePlus2,
} from "lucide-react";
import { Input } from "@/components/primitives/input";
import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { Button } from "@/components/primitives/button";
import { Textarea } from "@/components/primitives/textarea";
import {
  ResizableHandle,
  ResizablePanel,
} from "@/components/primitives/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";

type UploaderType = "Announcement" | "File";
const uploaders: UploaderType[] = ["Announcement", "File"];

export default function Uploader() {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploader, setUploader] = useState<UploaderType>("Announcement");
  const resizalePanelRef = useRef<ImperativePanelHandle | null>(null);

  const handleClick = () => {
    resizalePanelRef.current?.resize(!isUploaderOpen ? 6 : 25);
    setIsUploaderOpen((prev) => !prev);
  };

  return (
    <>
      <ResizableHandle
        className={cn(
          "border-black border",
          isUploaderOpen ? "cursor-default" : "cursor-n-resize"
        )}
        disabled={isUploaderOpen}
      />
      <ResizablePanel
        ref={resizalePanelRef}
        className={cn(
          "w-full gap-4 px-4 py-2 items-center bg-secondary flex flex-col transition-all"
        )}
        minSize={6}
        defaultSize={6}
        maxSize={25}
      >
        <div className="flex w-full items-center gap-4">
          <button onClick={handleClick}>
            <ChevronUp
              className={cn(
                "size-6 transition-transform duration-300",
                isUploaderOpen ? "rotate-0" : "rotate-180"
              )}
            />
          </button>
          <Input
            placeholder={`Enter the ${uploader === "Announcement" ? "Announcement Title" : "File Name"}`}
          />
          <Select onValueChange={(v) => setUploader(v as UploaderType)}>
            <SelectTrigger className="w-[40%]">
              <SelectValue placeholder={uploader} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {uploaders.map((c, idx) => (
                  <SelectItem key={idx} value={c}>
                    {c === "Announcement" ? (
                      <div className="flex items-center gap-4">
                        <MessageSquarePlus />
                        <span>Create an Announcement</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <FilePlus />
                        <span>Upload a New File</span>
                      </div>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant={"outline"}>
            <Upload />
          </Button>
        </div>
        {!isUploaderOpen && (
          <div className="flex flex-1 w-full items-center gap-4">
            <Textarea
              className="flex-1 size-full"
              placeholder={`Enter the description about ${uploader.toLowerCase()}...`}
            />
            {uploader === "File" && (
              <div className="w-[30%] gap-2 flex-col h-full flex justify-center items-center relative border-2 border-dashed border-white rounded-md cursor-pointer">
                <Input
                  type="file"
                  className="absolute flex-1 opacity-0 size-full cursor-pointer"
                />
                <FilePlus2 className="[&>path]:text-white" />
                <span className="text-white">Choose a File</span>
              </div>
            )}
          </div>
        )}
      </ResizablePanel>
    </>
  );
}
