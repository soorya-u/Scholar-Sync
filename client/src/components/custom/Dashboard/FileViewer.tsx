"use client";

import { File, Download } from "lucide-react";
import { Capacitor } from "@capacitor/core";

import { dateTimeFormatter } from "@/utils/date-formatter";
import CustomAvatar from "../CustomAvatar";

import {useFs} from "@/hooks/use-fs";

type FileViewerProps = {
  creatorId: string;
  creator: string;
  date: Date;
  title: string;
  fileName: string;
  description: string;
  fileUrl: string;
};

export default function FileViewer({
  creatorId,
  creator,
  date,
  description,
  fileName,
  title,
  fileUrl,
}: FileViewerProps) {
  const isNative = Capacitor.isNativePlatform();
  const {}  =useFs()
  return (
    <div className="flex">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-start gap-2">
          <CustomAvatar name={creator} id={creatorId} />
          <div className="flex items-center justify-start gap-2">
            <h2 className="font-kanit text-xl">{creator}</h2>
            <h4 className="font-kanit text-xs text-slate-500">
              {dateTimeFormatter(date)}
            </h4>
          </div>
        </div>
        <div className="ml-11 flex gap-2">
          <div className="flex gap-2 rounded-md bg-neutral-300/25 pr-16">
            <div className="h-full w-[0.3rem] rounded-l-md bg-neutral-300" />
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-center gap-2">
                <File className="size-5 -scale-x-100 [&>*]:text-yellow-500" />
                <h1 className="font-kanit text-lg text-yellow-500">{title}</h1>
              </div>
              <p className="pl-7 font-lato text-sm font-bold text-slate-700">
                {description}
              </p>
              {isNative ? (
                <></>
              ) : (
                <a
                  download={fileName}
                  href={`${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                  }/static/${encodeURIComponent(fileUrl)}`}
                  className="mt-1 flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-35"
                >
                  <Download className="size-5" />
                  <p className="font-kanit text-slate-700">{fileName}</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
    </div>
  );
}
