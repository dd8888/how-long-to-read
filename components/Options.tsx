import { Dispatch } from "react";
import { ReadingSpeed } from "../pages";
import { BookSpinner } from "./BookSpinner";

export const Options = ({
  setSelectedSpeed,
}: {
  setSelectedSpeed: Dispatch<ReadingSpeed>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-full">
      <span className="text-sm font-semibold">
        What&apos;s your reading speed?
      </span>
      <div className="flex  w-full h-[150px] items-center justify-around">
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <div className="scale-75">
            <BookSpinner duration={7} />
          </div>
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="slow"
            onChange={() => setSelectedSpeed("slow")}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <div className="scale-75">
            <BookSpinner duration={4} />
          </div>
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="normal"
            defaultChecked
            onChange={() => setSelectedSpeed("normal")}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <div className="scale-75">
            <BookSpinner duration={2} />
          </div>
          <input
            type="radio"
            className="scale-150 accent-stone-700"
            name="speed"
            value="fast"
            onChange={() => setSelectedSpeed("fast")}
          />
        </div>
      </div>
    </div>
  );
};
