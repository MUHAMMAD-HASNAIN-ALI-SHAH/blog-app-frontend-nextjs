import { useState } from "react";
import { VerticalBlogCard } from "./BlogCard";
import useHomeBlogStore from "../../store/home";

const categories = [
  "technology",
  "travel",
  "food",
  "lifestyle",
  "health",
  "education",
  "finance",
  "sports",
  "fashion",
  "entertainment",
];

const CategoryBlogs = () => {
  const { blogs } = useHomeBlogStore();
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredBlogs = blogs.filter(
    (b: { category: string; }) => b.category.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="w-full mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Browse by Category
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-sm font-medium capitalize rounded-xl shadow transition-all duration-200 
              ${
                activeTab === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs for active category */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBlogs.map((blog: { _id: any; title?: string; description?: string; image?: string; category?: string; views?: number; }) => {
            const safeBlog = {
              _id: blog._id,
              title: blog.title ?? "Untitled",
              description: blog.description ?? "No description available.",
              image: blog.image ?? "/default-image.jpg",
              category: blog.category ?? "Uncategorized",
              views: blog.views ?? 0,
            };
            return <VerticalBlogCard key={blog._id} blog={safeBlog} />;
          })}
        </div>
      ) : (
        <p className="text-gray-500">
          No blogs available in{" "}
          <span className="font-semibold">{activeTab}</span>.
        </p>
      )}
    </div>
  );
};

export default CategoryBlogs;
