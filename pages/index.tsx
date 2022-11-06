/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Roboto_Slab } from "@next/font/google";
import clsx from "clsx";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { motion } from "framer-motion";
import Head from "next/head";
import { useState } from "react";
import CountUp from "react-countup";
import { Input } from "../components/Input";
import { Options } from "../components/Options";
import { Book } from "../services/BooksServices";
import { getReadingTime } from "../utils/functions/getReadingTime";
import { useDebounce } from "../utils/hooks/useDebounce";
const roboto = Roboto_Slab({ subsets: ["latin"] });

dayjs.extend(duration);
export type ReadingSpeed = "slow" | "normal" | "fast";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [selectedSpeed, setSelectedSpeed] = useState<ReadingSpeed>("normal");
  const [readingTime, setReadingTime] = useState(60);
  const debouncedReadingTime = useDebounce(readingTime, 500);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={clsx(
          "flex justify-center w-screen h-screen py-10",
          roboto.className
        )}
      >
        <div className="flex flex-col items-center w-3/4 space-y-8">
          <Input setSelectedBook={setSelectedBook} />
          {selectedBook && (
            <div className="flex flex-col w-full gap-10 sm:grid sm:grid-cols-12 sm:max-w-2xl">
              {selectedBook.volumeInfo.imageLinks?.thumbnail ? (
                <div className="relative flex items-start justify-start w-full col-span-4">
                  <img
                    src={
                      selectedBook.volumeInfo.imageLinks?.thumbnail ??
                      selectedBook.volumeInfo.imageLinks?.smallThumbnail
                    }
                    alt={`${selectedBook.volumeInfo.title} cover`}
                    className="rounded-sm z-10 object-contain w-full -rotate-3 shadow-black hover:[transform-origin:left] hover:[transform:rotate3d(0,1,0,340deg)_rotate(-3deg)_translateY(5px)]"
                    style={{
                      boxShadow: "0 0 15px rgba(0,0,0,0.75)",
                      clipPath: "inset(0px -15px 0px 0px)",
                    }}
                  />
                  <img
                    src={
                      selectedBook.volumeInfo.imageLinks?.thumbnail ??
                      selectedBook.volumeInfo.imageLinks?.smallThumbnail
                    }
                    alt={`${selectedBook.volumeInfo.title} cover`}
                    className="rounded-sm absolute object-contain w-full h-[calc(100%-5px)] grayscale -rotate-3 -right-3 top-0.5"
                  />
                  <div
                    className="rounded-sm absolute object-contain w-full h-[calc(100%-15px)] -rotate-3 -right-2 top-2"
                    style={{
                      background:
                        "repeating-linear-gradient(to right,black,white 1px,black 2px)",
                    }}
                  ></div>
                </div>
              ) : (
                <img
                  src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
                  alt={`${selectedBook.volumeInfo.title} cover`}
                  height={83}
                  width={128}
                  className="object-cover w-full rounded-md"
                  onError={(e) => console.log(e)}
                />
              )}
              <div className="flex flex-col items-stretch h-full col-span-8 p-4 rounded-md bg-stone-100 text-stone-900">
                <div className="flex flex-col space-y-1">
                  <span className="text-lg font-semibold text-center ">
                    {selectedBook.volumeInfo.title}
                  </span>
                  <span className="text-center">
                    {selectedBook.volumeInfo.pageCount ?? "?"} pages
                  </span>
                </div>
                <div className="flex flex-col items-center justify-around m-auto space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", duration: 1, delay: 0 }}
                  >
                    <CountUp
                      end={getReadingTime(
                        selectedBook.volumeInfo.pageCount,
                        selectedSpeed
                      )}
                      delay={0}
                      useEasing={true}
                      preserveValue
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span
                            ref={countUpRef}
                            className="text-xl font-bold"
                          />
                          <span> minutes to finish</span>
                        </div>
                      )}
                    </CountUp>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", duration: 1, delay: 0.15 }}
                  >
                    <CountUp
                      end={parseFloat(
                        dayjs
                          .duration(
                            getReadingTime(
                              selectedBook.volumeInfo.pageCount,
                              selectedSpeed
                            ),
                            "minutes"
                          )
                          .asHours()
                          .toFixed(2)
                      )}
                      decimals={2}
                      delay={0}
                      useEasing={true}
                      preserveValue
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span
                            ref={countUpRef}
                            className="text-xl font-bold"
                          />
                          <span> hours to finish</span>
                        </div>
                      )}
                    </CountUp>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", duration: 1, delay: 0.3 }}
                  >
                    <CountUp
                      end={getReadingTime(
                        selectedBook.volumeInfo.pageCount,
                        selectedSpeed,
                        debouncedReadingTime
                      )}
                      decimals={2}
                      delay={0}
                      useEasing={true}
                      preserveValue
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span
                            ref={countUpRef}
                            className="text-xl font-bold"
                          />
                          <span> days to finish</span>
                        </div>
                      )}
                    </CountUp>
                  </motion.div>
                </div>
                <div className="flex flex-col self-end w-full space-y-1">
                  <span className="text-sm font-semibold text-right">
                    How much time do you plan to read per day? (in minutes)
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={readingTime}
                    onChange={(e) => setReadingTime(parseFloat(e.target.value))}
                    className="w-full h-10 p-2 text-white rounded-md select-all"
                    placeholder="90"
                  />
                </div>
              </div>
              <Options
                setSelectedSpeed={setSelectedSpeed}
                setReadingTime={setReadingTime}
                readingTime={readingTime}
              />
            </div>
          )}
        </div>
      </div>
      <div className="cursor-pointer space-x-1 group box-border p-0 rotate-0 skew-x-0 skew-y-0 fixed top-0 right-2 h-[35px] w-[25px] border-l-[12.5px] border-l-gray-400 border-r-[12.5px] border-r-gray-400 border-b-[12.5px] border-b-transparent hover:scale-[4] [transform-origin:top_right] duration-150 transition-all flex items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          width={100}
          height={100}
          className="z-10 w-[6px] max-w-[6px] group-hover:block hidden transition-all duration-200"
          alt="github logo"
          onClick={() => window.open("https://github.com/dd8888")}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
          width={100}
          height={100}
          className="z-10 w-[6px] max-w-[6px] group-hover:block hidden transition-all duration-200"
          alt="linkedin logo"
          onClick={() =>
            window.open("https://www.linkedin.com/in/david-diaz-dev/")
          }
        />
      </div>
    </div>
  );
}
//radios con diferentes animaciones, libro paginas de lento a rapido, para cuanto vas a leer al dia buscar algo
