import { dateFormatter } from "@/utils/date-formatter";

type AnnouncementViewerProps = {
  creator: string;
  date: Date;
  title: string;
  description: string;
};

export default function AnnouncementViewer({
  creator,
  date,
  description,
  title,
}: AnnouncementViewerProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 items-center justify-start">
        <div className="size-10 rounded-full bg-sky-400 flex justify-center items-center">
          <span className="text-2xl font-extrabold">{creator[0]}</span>
        </div>
        <h2 className="text-xl">{creator} has made a new Announcement</h2>
        <h4 className="text-sm">{dateFormatter(date)}</h4>
      </div>
      <div className="flex flex-col pl-10 gap-2">
        <h1 className="text-3xl">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
