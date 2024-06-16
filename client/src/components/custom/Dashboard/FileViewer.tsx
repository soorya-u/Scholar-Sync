import { FileDown } from "lucide-react";

type FileViewerProps = {
  creator: string;
  date: Date;
  title: string;
  fileName: string;
  description: string;
};

export default function FileViewer({
  creator,
  date,
  description,
  fileName,
  title,
}: FileViewerProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 items-center justify-start">
        <div className="size-10 rounded-full bg-sky-400 flex justify-center items-center">
          <span className="text-2xl font-extrabold">{creator[0]}</span>
        </div>

        <h2 className="text-xl">{creator} has Uploaded a new File</h2>
        <h4 className="text-sm justify-self-end">{date.toDateString()}</h4>
      </div>
      <div className="flex flex-col pl-10 gap-3">
        <h1 className="text-3xl">{title}</h1>
        <div className="flex items-center gap-4">
          <FileDown className="size-12" />
          <h3 className="text-lg">{fileName}</h3>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
