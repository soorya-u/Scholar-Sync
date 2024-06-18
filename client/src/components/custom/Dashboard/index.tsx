import { Separator } from "@/components/primitives/separator";
import FileViewer from "./FileViewer";
import AnnouncementViewer from "./AnnouncementViewer";
import { useCore } from "@/hooks/use-core";
import { useNexus } from "@/hooks/use-nexus";

export default function Dashboard() {
  const { core } = useCore();
  const { nexus } = useNexus();
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center w-full self-center">
        {/* TODO: Add Core and Nexus Check */}
        <h1 className="text-2xl">
          Welcome to {nexus.name} on {core.name}
        </h1>
        <div className="flex flex-col justify-center items-end">
          <h2 className="text-lg">Created by Alia Bhatt</h2>
          <h2 className="text-lg"> on 20/02/2020</h2>
        </div>
      </div>
      <Separator />
      <AnnouncementViewer
        creator="Soorya U"
        date={new Date()}
        description="orem ipsum dolor sit, amet consectetur adipisicing elit. Enim ipsum
            consectetur laborum cupiditate odio, asperiores quod aspernatur illo
            ea nisi hic dolorum officia, inventore sint tenetur rerum! Itaque
            quae soluta commodi vero ex. Odit, quaerat?"
        title="New Annnouncement WOw"
      />
      <FileViewer
        creator="Soorya U"
        date={new Date()}
        description="orem ipsum dolor sit, amet consectetur adipisicing elit. Enim ipsum
            consectetur laborum cupiditate odio, asperiores quod aspernatur illo
            ea nisi hic dolorum officia, inventore sint tenetur rerum! Itaque
            quae soluta commodi vero ex. Odit, quaerat?"
        fileName="Myfile.txt"
        title="New File WOw"
      />
    </div>
  );
}
