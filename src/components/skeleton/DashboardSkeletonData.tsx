const DashboardSkeletonData = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Blogs */}
        <div className="p-6 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center py-8">
          <div className="skeleton h-4 w-28 bg-gray-300"></div>
          <div className="skeleton h-4 w-20 mt-6 bg-gray-300"></div>
        </div>

        {/* Total Likes */}
        <div className="p-6 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center py-8">
          <div className="skeleton h-4 w-28 bg-gray-300"></div>
          <div className="skeleton h-4 w-20 mt-6 bg-gray-300"></div>
        </div>

        <div className="p-6 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center py-8">
          <div className="skeleton h-4 w-28 bg-gray-300"></div>
          <div className="skeleton h-4 w-20 mt-6 bg-gray-300"></div>
        </div>

        {/* Add a Blog */}
        <div className="p-6 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center py-8">
          <div className="skeleton h-4 w-28 bg-gray-300"></div>
          <div className="skeleton h-4 w-20 mt-6 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeletonData;
