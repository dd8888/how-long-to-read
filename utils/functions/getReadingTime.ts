export const getReadingTime = (pages: number, wpm = 225) => {
  const wordsPerPage = 300; //average
  const words = pages * wordsPerPage;
  const timeToRead = Math.ceil(words / wpm);
  return timeToRead;
};
