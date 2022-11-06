export const BookSpinner = ({ duration = 0.8 }: { duration?: number }) => {
  const Page = () => {
    return (
      <div
        className="w-1/2 h-0.5 bg-white absolute bottom-4 page-animation"
        style={{ "--page-duration": `${duration}s` } as React.CSSProperties}
      />
    );
  };
  return (
    <div className="relative flex flex-col w-20 page-wrapper">
      <div className="w-1/2 h-0.5 bg-white absolute bottom-4"></div>
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <div className="flex w-full">
        <div className="w-1/3 h-0.5 bg-white rounded-l-md" />
        <div className="w-1/3 h-3 bg-transparent rounded-b-md border-b-[2px] border-l-[2px] border-r-[2px] border-white" />
        <div className="w-1/3 h-0.5 bg-white rounded-r-md" />
      </div>
    </div>
  );
};
