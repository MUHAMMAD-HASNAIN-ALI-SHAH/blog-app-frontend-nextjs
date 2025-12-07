"use client";
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

interface blog {
  _id?: string;
  title: string;
  description: string;
  category: string;
  views?: number;
  image: string;
}

interface BlogStore {
  submitionState: Boolean;
  deleteState: Boolean;
  dashboardBlogsLoadingState: Boolean;
  blogs: blog[];
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
  addBlog: (blog: blog) => void;
  getBlogs: () => void;
  deleteBlog: (_id: string) => void;
  updateBlog: (blog: blog) => void;
  likedBlogs: () => Promise<blog[]>;
  getStats: () => void;
  clearState: () => void;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  stats: { likes: 0, views: 0, comments: 0 },
  deleteState: false,
  submitionState: false,
  dashboardBlogsLoadingState: false,
  addBlog: async (blog) => {
    set({ submitionState: true });
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        duration: 3000,
      });
      set({ submitionState: false });
    } catch (error: any) {
      toast.error("Failed to update blog", { duration: 3000 });
      console.error(error);
      set({ submitionState: false });
    }
  },
  getBlogs: async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      set({ dashboardBlogsLoadingState: true });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ blogs: response.data.blogs });
      set({ dashboardBlogsLoadingState: false });
    } catch (error: any) {
      console.log(error.response.data.status);
      set({ dashboardBlogsLoadingState: false });
    }
  },
  deleteBlog: async (id) => {
    try {
      const token = sessionStorage.getItem("access_token");
      set({ deleteState: true });
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        duration: 3000,
      });
      set({ deleteState: false });
    } catch (error: any) {
      toast.error(error?.response.data.message, { duration: 3000 });
      console.error(error);
      set({ deleteState: false });
    }
  },
  updateBlog: async (blog) => {
    set({ submitionState: true });
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {
        duration: 3000,
      });
      set({ submitionState: false });
    } catch (error: any) {
      toast.error("Failed to update blog", { duration: 3000 });
      console.error(error);
      set({ submitionState: false });
    }
  },

  likedBlogs: async () => {
    try {
      const response = await axios.get("/blog/liked-blogs");
      return response.data.blogs;
    } catch (error: any) {
      toast.error("Failed to fetch liked blogs", { duration: 3000 });
      console.error(error);
      return [];
    }
  },
  getStats: async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ stats: response.data });
    } catch (error: any) {
      console.log(error.response.status);
      toast.error("Failed to fetch comments", { duration: 3000 });
      console.error(error);
    }
  },
  clearState: () => {
    set({
      blogs: [],
      submitionState: false,
      deleteState: false,
      stats: { likes: 0, views: 0, comments: 0 },
    });
  },
}));

export default useBlogStore;
