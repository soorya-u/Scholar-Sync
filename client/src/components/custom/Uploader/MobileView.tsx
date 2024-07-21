import { FilePlus, MessageSquarePlus } from "lucide-react";
import { useState } from "react";

import { useUploader } from "@/hooks/use-uploader";

import { Button } from "@/components/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { Textarea } from "@/components/primitives/textarea";
import { cn } from "@/utils/cn";

type UploaderType = "Announcement" | "File";
const uploaders: UploaderType[] = ["Announcement", "File"];

export default function MobileView() {
  const [uploader, setUploader] = useState<UploaderType>("Announcement");
  const { register, handleSubmit, isSubmitting, errors } = useUploader(
    uploader,
    false
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="block 2xs:hidden w-full rounded-none h-12 font-kanit text-lg text-wrap">
          Add an Announcement / Upload a File
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center gap-4">
              {uploader === "Announcement" ? (
                <>
                  <MessageSquarePlus />
                  <span className="font-lato font-bold text-lg">
                    Create an Announcement
                  </span>
                </>
              ) : (
                <>
                  <FilePlus />
                  <span className="font-lato font-bold text-lg">
                    Upload a New File
                  </span>
                </>
              )}
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center items-center gap-2">
            <p className="font-lato font-bold pb-4">
              Add required Fields to{" "}
              {uploader === "Announcement"
                ? "create a new announcement"
                : "upload a new file"}
              . Click save when you&apos;re done.
            </p>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="flex flex-col justify-center gap-1">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-left">
                    Category{" "}
                    <span className="text-left text-xs opacity-65 text-red-500">
                      *
                    </span>
                  </Label>
                  <Select
                    defaultValue="Announcement"
                    onValueChange={(v: string) =>
                      setUploader(v as UploaderType)
                    }
                  >
                    <SelectTrigger className="w-full col-span-3 border-border font-lato font-bold text-foreground/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div
                style={{ gridTemplateRows: "40px 20px" }}
                className={cn(
                  "grid grid-cols-4 items-center gap-x-4 gap-y-0",
                  errors && errors.title && "grid-rows-2"
                )}
              >
                <Label htmlFor="name" className="text-left">
                  Title{" "}
                  <span className="text-left text-xs opacity-65 text-red-500">
                    *
                  </span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  {...register("title")}
                  className="col-span-3 border border-border font-lato font-bold text-foreground placeholder:text-foreground/80"
                  placeholder={`Enter the ${
                    uploader === "Announcement"
                      ? "Announcement Title"
                      : "File Name"
                  }`}
                />
                {errors && errors.title && (
                  <span className="text-sm text-red-500 text-start col-span-3 self-start col-start-2">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center gap-1">
                <div
                  style={{ gridTemplateRows: "70px 20px" }}
                  className={cn(
                    "grid grid-cols-4 items-center gap-x-4 gap-y-0",
                    errors && errors.title && "grid-rows-2"
                  )}
                >
                  <Label htmlFor="description" className="text-left">
                    Desc.{" "}
                    <span className="text-left text-xs opacity-65 text-red-500">
                      *
                    </span>
                  </Label>
                  <Textarea
                    {...register("description")}
                    className="text-sm size-full resize-none border border-border font-lato font-bold col-span-3 placeholder:text-foreground/80 text-foreground"
                    placeholder={`Enter the description about ${uploader.toLowerCase()}...`}
                  />
                  {errors && errors.description && (
                    <span className="text-sm text-red-500 text-start self-start col-start-2 col-span-3">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              {uploader === "File" && (
                <div
                  style={{ gridTemplateRows: "40px 20px" }}
                  className={cn(
                    "grid grid-cols-4 items-center gap-x-4 gap-y-0",
                    errors && errors.title && "grid-rows-2"
                  )}
                >
                  <Label htmlFor="upload" className="text-left">
                    File{" "}
                    <span className="text-left text-xs opacity-65 text-red-500">
                      *
                    </span>
                  </Label>
                  <Input
                    className="col-span-3 border border-border"
                    disabled={isSubmitting}
                    {...register("upload")}
                    type="file"
                  />
                  {/* @ts-ignore */}
                  {errors && errors.upload && (
                    <span className="text-sm text-red-500 text-start self-start col-start-2 col-span-3">
                      {/* @ts-ignore */}
                      {errors.upload.message}
                    </span>
                  )}
                </div>
              )}
              <Button className="mt-4" type="submit">
                {uploader === "Announcement" ? "Create" : "Upload"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
