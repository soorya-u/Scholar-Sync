"use client";

import { File, Download } from "lucide-react";

import { dateTimeFormatter } from "@/utils/date-formatter";
import CustomAvatar from "../CustomAvatar";

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
  return (
    <div className="flex">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center justify-start">
          <CustomAvatar name={creator} id={creatorId} />
          <div className="flex justify-start items-center gap-2">
            <h2 className="text-xl font-kanit">{creator}</h2>
            <h4 className="text-xs font-kanit text-slate-500">
              {dateTimeFormatter(date)}
            </h4>
          </div>
        </div>
        <div className="flex ml-11 gap-2">
          <div className="flex gap-2 bg-neutral-300/25 pr-16 rounded-md">
            <div className="h-full w-[0.3rem] bg-neutral-300 rounded-l-md" />
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-center items-center gap-2">
                <File className="size-5 [&>*]:text-yellow-500 -scale-x-100" />
                <h1 className="text-lg text-yellow-500 font-kanit">{title}</h1>
              </div>
              <p className="font-lato text-sm font-bold text-slate-700 pl-7">
                {description}
              </p>
              <a
                download={fileName}
                href={`${
                  process.env.NEXT_PUBLIC_BACKEND_URL
                }/static/${encodeURIComponent(fileUrl)}`}
                className="flex justify-center items-center gap-2 mt-1 transition-all duration-300 hover:opacity-35"
              >
                <Download className="size-5" />
                <p className="font-kanit text-slate-700">{fileName}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
    </div>
  );
}
