import { useState } from "react";
import {
  ChevronUp,
  Upload,
  MessageSquarePlus,
  FilePlus,
  FilePlus2,
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

  const { register, handleSubmit, isSubmitting } = useUploader(uploader);

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
          {/* {isUploaderOpen && (
            <span className="text-sm text-red-500 font-lato">
              {errors && errors.title && errors.title.message}
            </span>
          )} */}
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
            {/* <span className="font-lato text-red-500 text-sm">
              {errors && errors.description && errors.description.message}
            </span> */}
          </div>
          {uploader === "File" && (
            <div className="w-[30%] h-full flex flex-col gap-1">
              <div
                className={cn(
                  "w-full gap-2 flex-col h-full flex justify-center items-center relative border-2 border-dashed border-white rounded-md cursor-pointer",
                  isSubmitting && "opacity-60"
                )}
              >
                <Input
                  disabled={isSubmitting}
                  {...register("file")}
                  type="file"
                  className="absolute flex-1 opacity-0 size-full cursor-pointer"
                />
                <FilePlus2 className="[&>path]:text-white" />
                <span className="text-white">Choose a File</span>
              </div>
              {/* <span className="font-lato text-sm text-red-500">
                {errors && errors.description && errors.description.message}
              </span> */}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
