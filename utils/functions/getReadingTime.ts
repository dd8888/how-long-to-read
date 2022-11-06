import { ReadingSpeed } from "../../pages";

export const getReadingTime = (
  pages: number,
  readingSpeed?: ReadingSpeed,
  averageReadingTime?: number
) => {
  const getWpm = () => {
    switch (readingSpeed) {
      case "slow":
        return 250;
      case "normal":
        return 300;
      case "fast":
        return 450;
      default:
        return 300;
    }
  };
  const wordsPerPage = 300; //average
  const words = pages * wordsPerPage;
  const timeToRead = Math.ceil(words / getWpm());
  if (averageReadingTime) return timeToRead / averageReadingTime;
  return timeToRead;
};

// Third-grade students = 150 words per minute (wpm)
// Eighth grade students = 250 wpm
// Average college student = 450 wpm
// Average "high-level exec" = 575 wpm
// Average college professor = 675 wpm
// Speed readers = 1,500 wpm
// World speed reading champion = 4,700 wpm
// Average adult = 300 wpm
