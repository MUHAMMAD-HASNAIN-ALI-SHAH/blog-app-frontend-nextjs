"use client";
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiError } from "./auth";

interface blog {
  _id?: string;
  title: string;
  description: string;
  category: string;
  views?: number;
  image: string;
}

interface BlogStore {
  submitionState: boolean;
  deleteState: boolean;
  dashboardBlogsLoadingState: boolean;
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
    } catch (error: unknown) {
      toast.error("Failed to update blog", { duration: 3000 });
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
    } catch (error: unknown) {
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
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Failed to delete blog", { duration: 3000 });
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
    } catch (error: unknown) {
      toast.error("Failed to update blog", { duration: 3000 });
      set({ submitionState: false });
    }
  },

  likedBlogs: async () => {
    try {
      const response = await axios.get("/blog/liked-blogs");
      return response.data.blogs;
    } catch (error: unknown) {
      toast.error("Failed to fetch liked blogs", { duration: 3000 });
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
    } catch (error: unknown) {
      toast.error("Failed to fetch comments", { duration: 3000 });
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
