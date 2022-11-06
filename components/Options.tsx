import { Dispatch } from "react";
import { ReadingSpeed } from "../pages";
import { BookSpinner } from "./BookSpinner";

export const Options = ({
  setSelectedSpeed,
  setReadingTime,
  readingTime,
}: {
  setSelectedSpeed: Dispatch<ReadingSpeed>;
  setReadingTime: Dispatch<number>;
  readingTime: number;
}) => {
  return (
    <div className="grid w-full grid-cols-12 gap-10 col-span-full">
      <div className="flex flex-col w-full h-full col-span-4 space-y-2">
        <span className="text-sm font-semibold">
          What&apos;s your reading speed?
        </span>
        <div className="flex items-center w-full h-full space-x-10">
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="slow"
            onChange={() => setSelectedSpeed("slow")}
          />
          <div className="h-[80px] flex items-center scale-75">
            <BookSpinner duration={7} />
          </div>
        </div>
        <div className="flex items-center w-full h-full space-x-10">
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="normal"
            defaultChecked
            onChange={() => setSelectedSpeed("normal")}
          />
          <div className="h-[80px] flex items-center scale-75">
            <BookSpinner duration={4} />
          </div>
        </div>
        <div className="flex items-center w-full h-full space-x-10">
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="fast"
            onChange={() => setSelectedSpeed("fast")}
          />
          <div className="h-[80px] flex items-center scale-75">
            <BookSpinner duration={2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full col-span-8 space-y-2">
        <span className="text-sm font-semibold text-right">
          How much time do you plan to read per day? (in minutes)
        </span>
        <input
          type="number"
          min={1}
          value={readingTime}
          onChange={(e) => setReadingTime(parseFloat(e.target.value))}
          className="w-full h-10 p-2 rounded-md select-all"
          placeholder="90"
        />
      </div>
    </div>
  );
};
