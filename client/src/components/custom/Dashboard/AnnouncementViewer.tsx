"use client";

import { MessageSquare } from "lucide-react";

import { dateTimeFormatter } from "@/utils/date-formatter";
import CustomAvatar from "../CustomAvatar";

type AnnouncementViewerProps = {
  creatorId: string;
  creator: string;
  date: Date;
  title: string;
  description: string;
};

export default function AnnouncementViewer({
  creatorId,
  creator,
  date,
  description,
  title,
}: AnnouncementViewerProps) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center justify-start">
          <CustomAvatar name={creator} id={creatorId} />
          <div className="flex justify-start items-center gap-0 flex-col 3xs:flex-row 3xs:gap-2">
            <h2 className="text-xl self-start 3xs:self-center font-kanit">{creator}</h2>
            <h4 className="text-xs font-kanit text-slate-500">
              {dateTimeFormatter(date)}
            </h4>
          </div>
        </div>
        <div className="flex ml-11 gap-2">
          <div className="flex gap-2 bg-neutral-300/25 pr-16 rounded-md">
            <div className="h-full w-[0.3rem] bg-neutral-300 rounded-l-md" />
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <MessageSquare className="size-5 [&>*]:text-yellow-500 -scale-x-100" />
                <h1 className="text-lg text-yellow-500 font-kanit">{title}</h1>
              </div>
              <p className="font-lato text-sm font-bold text-slate-700">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
    </div>
  );
}
