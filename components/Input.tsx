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
  const DEFAULT_IMAGE_SRC =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";
  const IMAGE_CLASSNAME = "object-contain h-32 col-span-1 max-w-[83px] w-full";
  const IMAGE_ALT = `${title} cover`;

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
        <div
          className={clsx(
            "absolute flex flex-col w-full  z-10 p-2 space-y-2 overflow-y-auto rounded-md top-10 bg-stone-800",
            !books.length ? "h-[100px]" : "h-[600px]"
          )}
        >
          {!books.length && (
            <div className="flex items-center justify-center h-full">
              <span>{`Couldn't find your book :(`}</span>
            </div>
          )}
          {books.map((book, i) => (
            <div
              key={book.id}
              className={clsx(book.volumeInfo.pageCount === 0 && "hidden")}
            >
              {book.volumeInfo.pageCount && (
                <div
                  className="grid items-center w-full grid-cols-4 gap-6 p-1 px-2 rounded-md cursor-pointer sm:px-6 hover:bg-stone-700"
                  onClick={(e) => {
                    setSelectedBook(book);
                    setIsOpenDropdown(false);
                  }}
                  id="page-row"
                  tabIndex={0}
                >
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={IMAGE_ALT}
                      className={IMAGE_CLASSNAME}
                    />
                  ) : (
                    <img
                      src={
                        book.volumeInfo.imageLinks?.smallThumbnail ??
                        DEFAULT_IMAGE_SRC
                      }
                      alt={IMAGE_ALT}
                      height={83}
                      width={128}
                      className={IMAGE_CLASSNAME}
                    />
                  )}
                  <div className="flex flex-col col-span-3">
                    <span className="text-sm font-bold sm:text-lg">
                      {book.volumeInfo.title}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {book.volumeInfo?.authors?.join(", ")}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {book.volumeInfo.publishedDate}
                    </span>
                    <span className="text-xs sm:text-sm">
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
