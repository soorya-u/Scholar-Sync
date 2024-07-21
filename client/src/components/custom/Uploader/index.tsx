import { useState } from "react";
import {
  ChevronUp,
  Upload,
  MessageSquarePlus,
  FilePlus,
  FilePlus2,
  File,
  X,
} from "lucide-react";

import { Input } from "@/components/primitives/input";
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

import { useUser } from "@/hooks/use-user";

import { cn } from "@/utils/cn";
import { useUploader } from "@/hooks/use-uploader";
import MobileView from "./MobileView";

type UploaderType = "Announcement" | "File";
const uploaders: UploaderType[] = ["Announcement", "File"];

export default function Uploader() {
  const { user } = useUser();
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploader, setUploader] = useState<UploaderType>("Announcement");
  const [isFileExists, setIsFileExists] = useState(false);

  const { register, handleSubmit, isSubmitting, getValues, setValue } =
    useUploader(uploader);

  if (user.userType === "NORMAL") return;
  return (
    <>
      <MobileView />
      <form
        className={cn(
          "w-full gap-3 px-6 py-2 items-center hidden flex-col transition-all border-t border-border 2xs:flex",
          isUploaderOpen ? "h-52" : "h-[3.25rem]"
        )}
        onSubmit={handleSubmit}
      >
        <div
          className={cn(
            "flex w-full gap-4",
            isUploaderOpen ? "items-start" : "items-center"
          )}
        >
          <button
            type="button"
            onClick={() => setIsUploaderOpen((prev) => !prev)}
          >
            <ChevronUp
              className={cn(
                "size-6 transition-transform duration-300",
                isUploaderOpen ? "rotate-180 mt-[0.6rem]" : "rotate-0"
              )}
            />
          </button>
          <div className="w-full flex flex-col gap-1">
            <Input
              className="border-2 border-border font-lato font-bold text-sm"
              {...register("title")}
              placeholder={`Enter the ${
                uploader === "Announcement" ? "Announcement Title" : "File Name"
              }`}
            />
          </div>
          <Select
            defaultValue="Announcement"
            onValueChange={(v: string) => setUploader(v as UploaderType)}
          >
            <SelectTrigger className="w-[40%] border-2 border-border">
              <SelectValue placeholder={uploader} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {uploaders.map((c, idx) => (
                  <SelectItem key={idx} value={c}>
                    {c === "Announcement" ? (
                      <div className="flex items-center gap-4">
                        <MessageSquarePlus className="hidden lg:block" />
                        <span className="font-lato font-bold text-sm">
                          Create an Announcement
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <FilePlus className="hidden lg:block" />
                        <span className="font-lato font-bold text-sm">
                          Upload a New File
                        </span>
                      </div>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            disabled={!isUploaderOpen || isSubmitting}
            className="disabled:cursor-not-allowed"
            type="submit"
            variant={"default"}
          >
            <Upload />
          </Button>
        </div>
        {isUploaderOpen && (
          <div className="flex h-full flex-1 w-full items-center gap-4">
            <div className="flex h-full flex-col flex-1 gap-1">
              <Textarea
                {...register("description")}
                className="flex-1 text-sm size-full resize-none border-2 border-border font-lato font-bold"
                placeholder={`Enter the description about ${uploader.toLowerCase()}...`}
              />
            </div>
            {uploader === "File" && (
              <div className="w-[30%] h-full flex flex-col gap-1">
                <div
                  className={cn(
                    "w-full gap-2 flex-col h-full flex justify-center items-center relative border-[3px] border-dashed border-border rounded-md cursor-pointer",
                    isSubmitting && "opacity-60",
                    isFileExists && "cursor-default"
                  )}
                >
                  <Input
                    disabled={isSubmitting || isFileExists}
                    {...register("upload", {
                      onChange: () => setIsFileExists(true),
                    })}
                    type="file"
                    className="absolute flex-1 opacity-0 size-full cursor-pointer disabled:hidden"
                  />
                  {getValues("upload") && getValues("upload").length > 0 ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <File className="[&>path]:text-foreground size-8" />
                      <span className="text-foreground text-lg">
                        {getValues("upload")[0].name}
                      </span>
                      <button
                        className="absolute -top-3 -right-5 hover:opacity-65"
                        onClick={() => {
                          setValue("upload", []);
                          setIsFileExists(false);
                        }}
                      >
                        <X className="[&>path]:text-foreground size-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3 flex-col lg:flex-row justify-center items-center">
                      <FilePlus2 className="[&>path]:text-foreground" />
                      <span className="font-lato font-bold text-foreground text-sm text-center">
                        Choose a File
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </>
  );
}
