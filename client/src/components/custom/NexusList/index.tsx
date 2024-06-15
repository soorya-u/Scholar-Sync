import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { useState } from "react";

export default function NexusList() {
  const categories = [
    "First Semester",
    "Second Semester",
    "Third Semester",
    "Fourth Semester",
    "Fifth Semester",
    "Sixth Semester",
  ];
  const [category, setCategory] = useState(categories[0]);

  const routes = ["Data Structure and Algorithms", "Computer Organization"];

  return (
    <div className="relative flex bg-secondary py-4 flex-col gap-3 items-center px-2">
      {/* Render Catergoies */}
      <Select onValueChange={(v) => setCategory(v)}>
        <SelectTrigger className="w-[90%]">
          <SelectValue placeholder={category} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((c, idx) => (
              <SelectItem key={idx} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex-1 overflow-y-auto size-full flex flex-col px-3 py-2 gap-4">
        {[
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
          ...routes,
        ].map((r, idx) => (
          <h3
            className="text-center border border-white px-3 py-1 rounded cursor-pointer"
            key={idx}
          >
            {r}
          </h3>
        ))}
      </div>
    </div>
  );
}
