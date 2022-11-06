import { BookSpinner } from "./BookSpinner";

export const Options = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-2 col-span-full">
      <div className="flex items-center w-full h-full space-x-10">
        <input
          type="radio"
          className="scale-150 accent-stone-700"
          name="speed"
          value="slow"
        />
        <div className="h-[80px] flex items-center">
          <BookSpinner duration={3.0} />
        </div>
      </div>
      <div className="flex items-center w-full h-full space-x-10">
        <input
          type="radio"
          className="scale-150 accent-stone-700"
          name="speed"
          value="normal"
        />
        <div className="h-[80px] flex items-center">
          <BookSpinner duration={1.4} />
        </div>
      </div>
      <div className="flex items-center w-full h-full space-x-10">
        <input
          type="radio"
          className="scale-150 accent-stone-700"
          name="speed"
          value="fast"
        />
        <div className="h-[80px] flex items-center">
          <BookSpinner duration={0.8} />
        </div>
      </div>
    </div>
  );
};
