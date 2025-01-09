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

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@/hooks/use-user";

import { cn } from "@/utils/cn";
import { useUploader } from "@/hooks/use-uploader";
import MobileView from "./MobileView";
import { useNexus } from "@/hooks/use-nexus";

type UploaderType = "Announcement" | "File";
const uploaders: UploaderType[] = ["Announcement", "File"];

export default function Uploader() {
  const { user } = useUser();
  const { nexus } = useNexus();
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploader, setUploader] = useState<UploaderType>("Announcement");
  const [isFileExists, setIsFileExists] = useState(false);

  const { register, handleSubmit, isSubmitting, getValues, setValue } =
    useUploader(uploader);

  if (
    user.userType === "NORMAL" ||
    !(user.userType === "PSEUDOADMIN" && nexus.creator.id === user.id)
  )
    return;
  return (
    <>
      <MobileView />
      <form
        className={cn(
          "hidden w-full flex-col items-center gap-3 border-t border-border px-6 py-2 transition-all 2xs:flex",
          isUploaderOpen ? "h-52" : "h-[3.25rem]",
        )}
        onSubmit={handleSubmit}
      >
        <div
          className={cn(
            "flex w-full gap-4",
            isUploaderOpen ? "items-start" : "items-center",
          )}
        >
          <button
            type="button"
            onClick={() => setIsUploaderOpen((prev) => !prev)}
          >
            <ChevronUp
              className={cn(
                "size-6 transition-transform duration-300",
                isUploaderOpen ? "mt-[0.6rem] rotate-180" : "rotate-0",
              )}
            />
          </button>
          <div className="flex w-full flex-col gap-1">
            <Input
              className="border-2 border-border font-lato text-sm font-bold text-foreground placeholder:text-foreground/80"
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
                        <span className="font-lato text-sm font-bold">
                          Create an Announcement
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <FilePlus className="hidden lg:block" />
                        <span className="font-lato text-sm font-bold">
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
          <div className="flex h-full w-full flex-1 items-center gap-4">
            <div className="flex h-full flex-1 flex-col gap-1">
              <Textarea
                {...register("description")}
                className="size-full flex-1 resize-none border-2 border-border font-lato text-sm font-bold text-foreground placeholder:text-foreground/80"
                placeholder={`Enter the description about ${uploader.toLowerCase()}...`}
              />
            </div>
            {uploader === "File" && (
              <div className="flex h-full w-[30%] flex-col gap-1">
                <div
                  className={cn(
                    "relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-[3px] border-dashed border-border",
                    isSubmitting && "opacity-60",
                    isFileExists && "cursor-default",
                  )}
                >
                  <Input
                    disabled={isSubmitting || isFileExists}
                    {...register("upload", {
                      onChange: () => setIsFileExists(true),
                    })}
                    type="file"
                    className="absolute size-full flex-1 cursor-pointer opacity-0 disabled:hidden"
                  />
                  {getValues("upload") && getValues("upload").length > 0 ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <File className="size-8 [&>path]:text-foreground" />
                      <span className="text-lg text-foreground">
                        {getValues("upload")[0].name}
                      </span>
                      <button
                        className="absolute -right-5 -top-3 hover:opacity-65"
                        onClick={() => {
                          setValue("upload", new FileList());
                          setIsFileExists(false);
                        }}
                      >
                        <X className="size-4 [&>path]:text-foreground" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
                      <FilePlus2 className="[&>path]:text-foreground" />
                      <span className="text-center font-lato text-sm font-bold text-foreground">
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
