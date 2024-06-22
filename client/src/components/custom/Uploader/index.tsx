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
    <form
      className={cn(
        "w-full gap-3 px-6 py-2 items-center bg-secondary flex flex-col transition-all",
        isUploaderOpen ? "h-96" : "h-[3.25rem]"
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
            {...register("title")}
            placeholder={`Enter the ${uploader === "Announcement" ? "Announcement Title" : "File Name"}`}
          />
        </div>
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
        <Button
          disabled={!isUploaderOpen || isSubmitting}
          type="submit"
          variant={"outline"}
        >
          <Upload />
        </Button>
      </div>
      {isUploaderOpen && (
        <div className="flex h-full flex-1 w-full items-center gap-4">
          <div className="flex h-full flex-col flex-1 gap-1">
            <Textarea
              {...register("description")}
              className="flex-1 size-full resize-none"
              placeholder={`Enter the description about ${uploader.toLowerCase()}...`}
            />
          </div>
          {uploader === "File" && (
            <div className="w-[30%] h-full flex flex-col gap-1">
              <div
                className={cn(
                  "w-full gap-2 flex-col h-full flex justify-center items-center relative border-2 border-dashed border-white rounded-md cursor-pointer",
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
                    <File className="[&>path]:text-white size-8" />
                    <span className="text-white text-lg">
                      {getValues("upload")[0].name}
                    </span>
                    <button
                      className="absolute -top-3 -right-5 hover:opacity-65"
                      onClick={() => {
                        setValue("upload", []);
                        setIsFileExists(false);
                      }}
                    >
                      <X className="[&>path]:text-white size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <FilePlus2 className="[&>path]:text-white" />
                    <span className="text-white">Choose a File</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
