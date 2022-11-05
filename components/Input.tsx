/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, useState } from "react";
import { Book, BooksServices } from "../services/BooksServices";
import { useDebounce } from "../utils/hooks/useDebounce";
import { BookSpinner } from "./BookSpinner";

export const Input = ({
  setSelectedBook,
}: {
  setSelectedBook: Dispatch<Book>;
}) => {
  const [title, setTitle] = useState<string>("");
  const debouncedTitle = useDebounce(title, 500);
  const [isOpenDropown, setIsOpenDropdown] = useState(false);

  const {
    data: books,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["books", debouncedTitle],
    () => BooksServices.getBooks({ title: debouncedTitle }),
    {
      enabled: !!debouncedTitle && title !== "",
      onSuccess: () => setIsOpenDropdown(true),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div
      className="relative z-20 flex flex-col items-center w-full max-w-2xl space-y-1"
      onBlur={(e) => {
        if (e.relatedTarget?.id !== "page-row") {
          setIsOpenDropdown(false);
        }
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-10 p-2 rounded-md select-all"
        onFocus={() => !!debouncedTitle && refetch()}
        placeholder="Search books by title..."
      />
      {(isLoading || isFetching) && title && (
        <div className="absolute flex flex-col items-center z-10 justify-center w-full h-[300px] p-2 space-y-2 overflow-y-auto rounded-md top-10 bg-stone-800">
          <BookSpinner />
        </div>
      )}
      {books && isOpenDropown && (
        <div className="absolute flex flex-col w-full h-[600px] z-10 p-2 space-y-2 overflow-y-auto rounded-md top-10 bg-stone-800">
          {books.map((book, i) => (
            <div
              key={book.id}
              className={clsx(book.volumeInfo.pageCount === 0 && "hidden")}
            >
              {book.volumeInfo.pageCount && (
                <div
                  className="grid items-center w-full grid-cols-4 gap-6 p-1 px-6 rounded-md cursor-pointer hover:bg-stone-700"
                  onClick={(e) => {
                    setSelectedBook(book);
                    setIsOpenDropdown(false);
                  }}
                  id="page-row"
                  tabIndex={0}
                >
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ??
                        book.volumeInfo.imageLinks?.smallThumbnail
                      }
                      alt={`${title} cover`}
                      className="object-contain h-32 col-span-1 max-w-[83px]"
                      onError={(e) => console.log(e)}
                    />
                  ) : (
                    <img
                      src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
                      alt={`${title} cover`}
                      height={83}
                      width={128}
                      className="object-cover col-span-1 h-[128px] max-w-[83px]"
                      onError={(e) => console.log(e)}
                    />
                  )}
                  <div className="flex flex-col col-span-3">
                    <span className="text-lg font-bold">
                      {book.volumeInfo.title}
                    </span>
                    <span className="text-sm">
                      {book.volumeInfo?.authors?.join(", ")}
                    </span>
                    <span className="text-sm">
                      {book.volumeInfo.publishedDate}
                    </span>
                    <span className="text-sm">
                      {book.volumeInfo.pageCount ?? "?"} pages
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Third-grade students = 150 words per minute (wpm)
// Eighth grade students = 250 wpm
// Average college student = 450 wpm
// Average "high-level exec" = 575 wpm
// Average college professor = 675 wpm
// Speed readers = 1,500 wpm
// World speed reading champion = 4,700 wpm
// Average adult = 300 wpm
