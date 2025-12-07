
const DashboardSkeletonBlogs = () => {
  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
        {true ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full bg-gray-300"></div>
                <div className="skeleton h-4 w-28 bg-gray-300"></div>
                <div className="skeleton h-4 w-full bg-gray-300"></div>
                <div className="skeleton h-4 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className="text-lg font-semibold">No Blogs Available</p>
          </div>
        )}
      </div>
  )
}

export default DashboardSkeletonBlogs
