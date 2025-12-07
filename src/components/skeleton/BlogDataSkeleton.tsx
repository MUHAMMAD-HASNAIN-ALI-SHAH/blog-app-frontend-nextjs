const BlogDataSkeleton = () => {
  return (
    <>
      <div className="skeleton h-[300px] w-full object-cover rounded-lg bg-gray-300"></div>
      <div className="skeleton h-7 w-full sm:w-[80%] lg:w-[50%] bg-gray-300"></div>
      <div className="skeleton h-7 w-full bg-gray-300"></div>
      <div className="skeleton h-7 w-full bg-gray-300"></div>
      <div className="skeleton h-7 w-full bg-gray-300"></div>
      <div className="skeleton h-7 w-full bg-gray-300"></div>
      <div className="flex flex-col items-center justify-center"></div>
      <div className="flex justify-center">
        <div className="skeleton h-7 w-9 bg-gray-300"></div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="skeleton h-7 w-full sm:w-[80%] lg:w-[50%] bg-gray-300 mt-5"></div>
        {true &&
          [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="skeleton flex flex-col gap-1 p-2 rounded-lg border border-gray-300"
            >
              <div className="skeleton h-7 w-full sm:w-[80%] lg:w-[50%] bg-gray-300"></div>
              <div className="skeleton h-7 w-full bg-gray-300"></div>
            </div>
          ))}

        <button className="skeleton w-24 bg-gray-300 btn border-none"></button>
      </div>
    </>
  );
};

export default BlogDataSkeleton;
