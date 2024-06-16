import { FileDown } from "lucide-react";

import { Separator } from "@/components/primitives/separator";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center w-full self-center">
        <h1 className="text-2xl">Welcome to Nexus[0] on Core[0]</h1>
        <div className="flex flex-col justify-center items-end">
          <h2 className="text-lg">Created by Alia Bhatt</h2>
          <h2 className="text-lg"> on 20/02/2020</h2>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/608/790/non_2x/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg"
              className="size-10 rounded-full"
            />
            <h2 className="text-lg">Alia Bhatt has made a new Announcement</h2>
          </div>
          <h4 className="text-base justify-self-end">20/20/2000</h4>
        </div>
        <div className="flex flex-col pl-10 gap-2">
          <h1 className="text-3xl">Some Random Heading</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim ipsum
            consectetur laborum cupiditate odio, asperiores quod aspernatur illo
            ea nisi hic dolorum officia, inventore sint tenetur rerum! Itaque
            quae soluta commodi vero ex. Odit, quaerat?
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/608/790/non_2x/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg"
              className="size-10 rounded-full"
            />
            <h2 className="text-lg">Alia Bhatt has Uploaded a new File</h2>
          </div>
          <h4 className="text-base justify-self-end">20/20/2000</h4>
        </div>
        <div className="flex flex-col pl-10 gap-3">
          <h1 className="text-3xl">Some Random Heading</h1>
          <div className="flex items-center gap-4">
            <FileDown className="size-12" />
            <h3 className="text-lg">File Name.txt</h3>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim ipsum
            consectetur laborum cupiditate odio, asperiores quod aspernatur illo
            ea nisi hic dolorum officia, inventore sint tenetur rerum! Itaque
            quae soluta commodi vero ex. Odit, quaerat?
          </p>
        </div>
      </div>
    </div>
  );
}
