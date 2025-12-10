import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import useBlogStore from "../../store/blog";
import { useState } from "react";
import EditBlog from "./EditBlog";
import AddBlog from "./AddBlog";
import Image from "next/image";

const DashboardBlogs = () => {
  const { blogs, deleteBlog, getBlogs, deleteState } = useBlogStore();

  const [editOpened, editHandlers] = useDisclosure(false);
  const [addOpened, addHandlers] = useDisclosure(false);

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedBlogId(id);
    editHandlers.open();
  };

  const deleteBlogFunction = async (_id: string) => {
    await deleteBlog(_id);
    await getBlogs();
  };

  return (
    <div className="p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">My Blogs</h2>

        {/* Add Blog Modal */}
        <Modal opened={addOpened} onClose={addHandlers.close} title="Add Blog" centered>
          <AddBlog onClose={addHandlers.close} />
        </Modal>

        <button
          onClick={addHandlers.open}
          className="px-5 py-2 cursor-pointer rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Add Blog
        </button>
      </div>

      {/* Edit Blog Modal */}
      <Modal opened={editOpened} onClose={editHandlers.close} title="Edit Blog" centered>
        {selectedBlogId && (
          <EditBlog _id={selectedBlogId} onClose={editHandlers.close} />
        )}
      </Modal>

      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 w-full border border-gray-300 rounded-xl shadow-2xl"
            >
              <figure className="h-[180px]">
                <Image
                  src={blog.image}
                  alt={typeof blog.title === "string" ? blog.title : ""}
                  className="w-full h-full object-cover rounded-t-xl"
                  width={400}
                  height={180}
                />
              </figure>

              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold">{blog.title}</h2>

                <p className="text-gray-600 text-sm">
                  {typeof blog.description === "string"
                    ? blog.description.length > 100
                      ? `${blog.description.substring(0, 100)}...`
                      : blog.description
                    : blog.description ?? ""}
                </p>

                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    onClick={() => handleEdit(String(blog._id))}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() =>
                      blog._id && deleteBlogFunction(String(blog._id))
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
