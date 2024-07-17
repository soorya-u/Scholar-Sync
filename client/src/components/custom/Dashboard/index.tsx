import { useEffect, useState } from "react";

import { useNexus } from "@/hooks/use-nexus";

import { Announcement, File } from "@/types/api";

import { Separator } from "@/components/primitives/separator";
import FileViewer from "./FileViewer";
import AnnouncementViewer from "./AnnouncementViewer";
import { dateFormatter } from "@/utils/date-formatter";

export default function Dashboard() {
  const { nexus } = useNexus();
  const [dashboardList, setDashboardList] = useState<(Announcement | File)[]>(
    []
  );

  useEffect(() => {
    const list = [...nexus.announcements, ...nexus.files].sort(
      (l1, l2) =>
        new Date(l1.timeStamp).getTime() - new Date(l2.timeStamp).getTime()
    );

    setDashboardList(list);
  }, [nexus]);

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 h-full overflow-y-auto">
      <div className="flex justify-between">
        <h1 className="text-slate-500 text-lg font-kanit">
          Enjoy your Time from here on
        </h1>
        <h1 className="text-slate-500 text-lg font-kanit">
          {dateFormatter(new Date(nexus.createdAt))}
        </h1>
      </div>
      <Separator className="opacity-25" />

      {dashboardList.map((d) => {
        if (d.id.split(":")[0] === "announcement")
          return (
            <AnnouncementViewer
              key={d.id}
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
  );
}
