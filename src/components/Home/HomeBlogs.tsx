"use client";
import { useEffect } from "react";
import useHomeBlogStore from "../../store/home";
import { HorizontalBlogCard, VerticalBlogCard } from "./BlogCard";
import CategoryBlogs from "./CategoryBlogs";

const PopularBlogs = () => {
  const { blogs } = useHomeBlogStore();
  const popularBlogs = blogs
    .sort((a: { views: number }, b: { views: number }) => b.views - a.views)
    .slice(0, 4);

  return (
    <div className="mt-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-gray-800">Popular Blogs</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {popularBlogs.map((blog) => (
          <VerticalBlogCard
            key={blog._id}
            blog={{
              _id: blog._id ?? "",
              title: blog.title ?? "",
              description: blog.description ?? "",
              image: blog.image ?? "",
              category: blog.category ?? "",
              views: blog.views ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const RecentsBlogs = () => {
  const { blogs } = useHomeBlogStore();
  const recentsBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto py-8 mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recents Posts</h3>

      <div className="flex flex-col gap-6">
        {recentsBlogs.map((blog) => (
          <HorizontalBlogCard
            key={blog._id}
            blog={{
              _id: blog._id ?? "",
              title: blog.title ?? "",
              description: blog.description ?? "",
              image: blog.image ?? "",
              category: blog.category ?? "",
              views: blog.views ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const HomeBlogs = () => {
  const { blogs, getBlogs, getHomeBlogsLoader } = useHomeBlogStore();

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      getBlogs();
    }
  }, [getBlogs,blogs]);

  return (
    <div className="py-6 px-6">
      {/* ✅ Loader */}
      {getHomeBlogsLoader && (
        <div className="flex justify-center items-center h-40">
          <div className="flex space-x-3">
            <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        </div>
      )}

      {/* ✅ Main Content */}
      {blogs && blogs.length > 0 && !getHomeBlogsLoader && (
        <>
          <PopularBlogs />
          <RecentsBlogs />
          <CategoryBlogs />
        </>
      )}

      {/* ✅ No Blogs Message */}
      {blogs && blogs.length === 0 && !getHomeBlogsLoader && (
        <p className="text-gray-500 text-center mt-10">No blogs available.</p>
      )}
    </div>
  );
};

export default HomeBlogs;
