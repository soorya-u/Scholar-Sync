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
        <div className="flex items-center justify-start gap-2">
          <CustomAvatar name={creator} id={creatorId} />
          <div className="flex flex-col items-center justify-start gap-0 3xs:flex-row 3xs:gap-2">
            <h2 className="self-start font-kanit text-xl 3xs:self-center">
              {creator}
            </h2>
            <h4 className="font-kanit text-xs text-slate-500">
              {dateTimeFormatter(date)}
            </h4>
          </div>
        </div>
        <div className="ml-11 flex gap-2">
          <div className="flex gap-2 rounded-md bg-neutral-300/25 pr-16">
            <div className="h-full w-[0.3rem] rounded-l-md bg-neutral-300" />
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 self-start">
                <MessageSquare className="size-5 -scale-x-100 [&>*]:text-yellow-500" />
                <h1 className="font-kanit text-lg text-yellow-500">{title}</h1>
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
