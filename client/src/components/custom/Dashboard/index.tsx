import { useEffect, useState } from "react";

import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";

import { Announcement, File } from "@/types/api";

import { Separator } from "@/components/primitives/separator";
import FileViewer from "./FileViewer";
import AnnouncementViewer from "./AnnouncementViewer";
import { dateFormatter } from "@/utils/date-formatter";

export default function Dashboard() {
  const { core } = useCore();
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
      <div className="flex justify-between items-center w-full self-center">
        {/* TODO: Add Core and Nexus Check */}
        <h1 className="text-2xl">
          Welcome to {nexus.name} on {core.name}
        </h1>
        <div className="flex flex-col justify-center items-end">
          <h2 className="text-lg">
            Created by {nexus.creator && nexus.creator.fullName}
          </h2>
          <h2 className="text-lg">
            {" "}
            on {dateFormatter(new Date(nexus.createdAt))}
          </h2>
        </div>
      </div>
      <Separator />
      {dashboardList.map((d) => {
        console.log(d.timeStamp);
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
              fileName={d.fileUrl}
              title={d.title}
            />
          );
      })}
    </div>
  );
}
