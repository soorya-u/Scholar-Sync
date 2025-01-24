import { useMemo } from "react";

import { useNexus } from "@/hooks/use-nexus";

import { Separator } from "@/components/ui/separator";

import FileViewer from "./file-viewer";
import AnnouncementViewer from "./announcement-viewer";

import { dateFormatter } from "@/utils/date-formatter";

import { TAnnouncement, TFile } from "@/types/api";

type TResource =
  | (TAnnouncement & { type: "announcement" })
  | (TFile & { type: "file" });

export default function Viewer() {
  const { nexus } = useNexus();

  const resources: TResource[] = useMemo(() => {
    const announcements: (TAnnouncement & { type: "announcement" })[] =
      nexus.announcements.map((a) => ({
        ...a,
        type: "announcement",
      }));
    const files: (TFile & { type: "file" })[] = nexus.files.map((f) => ({
      ...f,
      type: "file",
    }));

    return [...files, ...announcements].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
  }, [nexus]);

  return (
    <div className="flex-1 overflow-x-auto">
      {resources.length === 0 ? (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-y-auto p-4">
          <h1 className="text-center font-playwrite text-3xl text-amber-300">
            No Files or Announcements Found
          </h1>
          <img src="/not-found.png" alt="not found" height={150} width={150} />
        </div>
      ) : (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div className="flex justify-between">
            <h1 className="font-kanit text-lg text-slate-500">
              Enjoy your Time from here on
            </h1>
            <h1 className="hidden font-kanit text-base text-slate-500 lg:block">
              {dateFormatter(new Date(nexus.createdAt))}
            </h1>
          </div>
          <Separator className="opacity-25" />

          {resources.map((d) =>
            d.type === "announcement" ? (
              <AnnouncementViewer
                key={d.id}
                creatorId={d.sentBy.id}
                creator={d.sentBy.fullName}
                date={new Date(d.timestamp)}
                description={d.message}
                title={d.title}
              />
            ) : (
              <FileViewer
                key={d.id}
                creatorId={d.sentBy.id}
                creator={d.sentBy.fullName}
                date={new Date(d.timestamp)}
                description={d.description}
                fileUrl={d.fileUrl}
                fileName={d.fileName}
                title={d.title}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
