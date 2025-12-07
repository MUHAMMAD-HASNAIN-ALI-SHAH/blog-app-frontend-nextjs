"use client";

import Comments from "./Comments";
import { useEffect, useRef, useState, useCallback } from "react";
import useHomeBlogStore from "../../store/home";
import useAuthStore from "../../store/auth";
import toast from "react-hot-toast";
import BlogDataSkeleton from "../skeleton/BlogDataSkeleton";
import { useParams } from "next/navigation";
import Image from "next/image";

const Blog = () => {
  const { id } = useParams();
  const blogId = Array.isArray(id) ? id[0] : id;

  const { like, getBlogData, blog, viewBlog, clearStateBlogData } =
    useHomeBlogStore();
  const { isAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const hasViewedRef = useRef(false);

  // -------------------------------
  // Stable callbacks (fix dependency warnings)
  // -------------------------------
  const handleView = useCallback(async (id: string) => {
    await viewBlog(id);
  }, [viewBlog]);

  const handleFetchBlog = useCallback(async (id: string) => {
    await getBlogData(id);
  }, [getBlogData]);

  const handleClear = useCallback(() => {
    clearStateBlogData();
  }, [clearStateBlogData]);

  // -------------------------------
  // Fetch blog on load
  // -------------------------------
  useEffect(() => {
    if (!blogId || hasViewedRef.current) return;

    hasViewedRef.current = true;

    (async () => {
      handleClear();
      await handleView(blogId);
      await handleFetchBlog(blogId);
    })();
  }, [blogId, handleClear, handleFetchBlog, handleView]);

  // -------------------------------
  // Like blog
  // -------------------------------
  const LikeBlog = async (blogId: string | null) => {
    if (!blogId) return;

    if (!isAuthenticated) {
      toast.error("Please login to like a blog", { duration: 3000 });
      return;
    }

    setLoading(true);
    try {
      await like(blogId);
      await handleFetchBlog(blogId);
    } catch (error) {
      console.error("Error liking the blog:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Invalid ID
  // -------------------------------
  if (!blogId) {
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        Error: Invalid blog ID
      </p>
    );
  }

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 mt-6 mb-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-5">
        {blog ? (
          <>
            <div className="overflow-hidden rounded-xl mb-4">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-60 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {blog.title}
            </h1>

            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              {blog.description}
            </p>

            <div className="flex flex-col items-center justify-center gap-1 mb-6">
              <button
                onClick={() => LikeBlog(blog._id)}
                disabled={loading}
                className={`text-3xl text-red-500 hover:text-red-600 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ❤️
              </button>
              <p className="text-gray-600 font-medium">
                {blog.likes?.length || 0} Likes
              </p>
            </div>

            <Comments blogId={blogId!} comments={blog.comments || []} />
          </>
        ) : (
          <BlogDataSkeleton />
        )}
      </div>
    </div>
  );
};

export default Blog;
