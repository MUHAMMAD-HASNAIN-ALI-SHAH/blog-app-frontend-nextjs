"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const VerticalBlogCard = ({
  blog,
}: {
  blog: {
    _id?: string | null;
    title: string;
    description: string;
    image: string;
    category: string;
    views: number;
  };
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${blog._id}`)}
      key={blog._id}
      className="relative bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Views Badge */}
      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
        👁️ {blog.views || 0}
      </div>

      {/* Image */}
      <div className="h-[180px] w-full">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover rounded-t-2xl"
          width={400}
          height={180}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {blog.title.length > 25
            ? blog.title.substring(0, 25) + "..."
            : blog.title}
        </h2>

        <p className="text-gray-600 text-sm">
          {blog.description.length > 100
            ? blog.description.substring(0, 100) + "..."
            : blog.description}
        </p>
      </div>
    </div>
  );
};

export const HorizontalBlogCard = ({
  blog,
}: {
  blog: {
    _id?: string | null;
    title: string;
    description: string;
    image: string;
    category: string;
    views: number;
  };
}) => {
  const router = useRouter();

  return (
    <div
      key={blog._id}
      onClick={() => router.push(`/blog/${blog._id}`)}
      className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="sm:w-64 w-full h-40 bg-gray-100 flex-shrink-0">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          width={256}
          height={160}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {blog.title.length > 100
            ? blog.title.substring(0, 100) + "..."
            : blog.title}
        </h3>

        <p className="text-gray-500 text-sm mb-3">
          {blog.description.length > 120
            ? blog.description.substring(0, 120) + "..."
            : blog.description}
        </p>

        <span className="text-blue-600 text-sm font-medium">👁️ {blog.views}</span>
      </div>
    </div>
  );
};
