import { useEffect, useState } from "react";

import { useNexus } from "@/hooks/use-nexus";

import { Announcement, File } from "@/types/api";

import { Separator } from "@/components/ui/separator";
import FileViewer from "./FileViewer";
import AnnouncementViewer from "./AnnouncementViewer";
import { dateFormatter } from "@/utils/date-formatter";

export default function Dashboard() {
  const { nexus } = useNexus();
  const [dashboardList, setDashboardList] = useState<(Announcement | File)[]>(
    [],
  );

  useEffect(() => {
    const list = [...nexus.announcements, ...nexus.files].sort(
      (l1, l2) =>
        new Date(l1.timeStamp).getTime() - new Date(l2.timeStamp).getTime(),
    );

    setDashboardList(list);
  }, [nexus]);

  return (
    <>
      {dashboardList.length === 0 ? (
        <div className="flex h-full flex-1 flex-col justify-center items-center gap-4 overflow-y-auto p-4">
          <h1 className="text-3xl text-center font-playwrite text-amber-300">No Files or Announcements Found</h1>
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

          {dashboardList.map((d) => {
            if (d.id.split(":")[0] === "announcement")
              return (
                <AnnouncementViewer
                  key={d.id}
                  creatorId={d.sentBy.id}
                  creator={d.sentBy.fullName}
                  date={new Date(d.timeStamp)}
                  // @ts-ignore
                  description={d.message}
                  title={d.title}
                />
              );
            else if (d.id.split(":")[0] === "file")
              return (
                <FileViewer
                  key={d.id}
                  creatorId={d.sentBy.id}
                  creator={d.sentBy.fullName}
                  date={new Date(d.timeStamp)}
                  // @ts-ignore
                  description={d.description}
                  // @ts-ignore
                  fileUrl={d.fileUrl}
                  // @ts-ignore
                  fileName={d.fileName}
                  title={d.title}
                />
              );
          })}
        </div>
      )}
    </>
  );
}
