import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import useBlogStore from "../../store/blog";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import EditBlog from "./EditBlog";
import AddBlog from "./AddBlog";

const DashboardBlogs = () => {
  const { blogs, deleteBlog, getBlogs, deleteState } = useBlogStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const [AddBlogOpened, addBlog] = useDisclosure(false);

  const handleEdit = (id: string) => {
    close();
    setSelectedBlogId(id);
    open();
  };

  const deleteBlogFunction = async (_id: string) => {
    await deleteBlog(_id);
    await getBlogs();
  };

  return (
    <div className="p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
        <Modal opened={AddBlogOpened} onClose={addBlog.close} title="Add Blog" centered>
          <AddBlog onClose={addBlog.close} />
        </Modal>
        <Button onClick={addBlog.open} className="btn btn-primary">
          Add Blog
        </Button>
      </div>

      <Modal opened={opened} onClose={close} title="Edit Blog" centered>
        {selectedBlogId !== null && (
          <EditBlog _id={selectedBlogId} onClose={close} />
        )}
      </Modal>

      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 w-full border border-base-200 rounded-xl shadow-2xl"
            >
              {/* Image */}
              <figure className="h-[180px]">
                <img
                  src={blog.image}
                  alt={typeof blog.title === "string" ? blog.title : ""}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </figure>

              {/* Card Content */}
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold">
                  {blog.title}
                </h2>

                {/* Truncate Description to 100 characters */}
                <p className="text-gray-600 text-sm">
                  {typeof blog.description === "string"
                    ? blog.description.length > 100
                      ? `${blog.description.substring(0, 100)}...`
                      : blog.description
                    : blog.description ?? ""}
                </p>

                <div className="card-actions justify-end mt-2">
                  <Button
                    onClick={() => handleEdit(String(blog._id))}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      blog._id !== null && deleteBlogFunction(String(blog._id))
                    }
                    className="bg-red-500 hover:bg-red-600"
                    disabled={!!deleteState}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-lg font-semibold">No Blogs Available</p>
        </div>
      )}
    </div>
  );
};

export default DashboardBlogs;
