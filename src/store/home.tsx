import { create } from "zustand";
import axios from "axios";
import { BlogData, HomeBlog } from "../interfaces/BlogInterfaces";
import toast from "react-hot-toast";

interface BlogStore {
  blogs: HomeBlog[];
  commentLoadingState: boolean;
  blog: BlogData | null;
  getHomeBlogsLoader: boolean;
  getBlogs: () => void;
  getBlogData: (_id: string | null) => void;
  addComment: (data: { comment: string }, _id: string) => void;
  like: (_id: string) => void;
  clearStateBlogData: () => void;
  viewBlog: (_id: string) => void;
}

const useHomeBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  blog: null,
  getHomeBlogsLoader: false,
  commentLoadingState: false,
  getBlogs: async () => {
    try {
      set({ getHomeBlogsLoader: true });
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
      set({ blogs: response.data.blogs });
      set({ getHomeBlogsLoader: false });
    } catch (error) {
      set({ getHomeBlogsLoader: false });
      console.error("Error fetching blogs:", error);
      set({ blogs: [] });
    }
  },
  getBlogData: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
      );
      set({ blog: response.data.blog });
    } catch (error:unknown) {
      return null;
    }
  },
  viewBlog: async (id) => {
    const token = sessionStorage.getItem("access_token");
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  like: async (id) => {
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        duration: 3000,
      });
    } catch (error: unknown) {
      toast.error("Failed to add comment", { duration: 3000 });
    }
  },
  addComment: async (data, id) => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        toast.error("Plz signin to comment", { duration: 3000 });
        return;
      }
      set({ commentLoadingState: true });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        duration: 3000,
      });
      set({ commentLoadingState: false });
    } catch (error: unknown) {
      toast.error("Failed to add comment", { duration: 3000 });
      set({ commentLoadingState: false });
    }
  },
  clearStateBlogData: () => set({ blog: null }),
}));

export default useHomeBlogStore;
