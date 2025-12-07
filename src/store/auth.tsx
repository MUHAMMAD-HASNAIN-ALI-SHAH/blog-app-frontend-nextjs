import { create } from "zustand";
import toast from "react-hot-toast";
import useBlogStore from "./blog";
import axios from "axios";

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

interface User {
  _id?: string;
  username: string;
  email: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  signin: (formData: { email: string; password: string }) => Promise<number>;
  register: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<number>;
  updateImage: (formData: { image: string }) => Promise<number>;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set: (arg0: { authLoader?: boolean; user?: User | null; isAuthenticated?: boolean; isAuthenticatedLoading?: boolean; }) => void) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  authLoader: false,

  register: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData
      );
      toast.success(response.data.message, { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Signup failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      console.log(error);
      return 0;
    }
  },

  signin: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        formData
      );
      sessionStorage.setItem("access_token", response.data.access_token);
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ authLoader: false });
      return 1;
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Login failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      return 0;
    }
  },

  updateImage: async (formdata) => {
    try {
      const token = sessionStorage.getItem("access_token");
      set({ authLoader: true });

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/image`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Image updated successfully", { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (err) {
      toast.error("Image update failed");
      console.error(err);
      set({ authLoader: false });
      return 0;
    }
  },

  verify: async () => {
    try {
      useBlogStore.getState().clearState();
      set({ isAuthenticatedLoading: true });
      const token = sessionStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ isAuthenticatedLoading: false });
    } catch (error: unknown) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      useBlogStore.getState().clearState();
      set({ user: null, isAuthenticated: false });
      sessionStorage.removeItem("access_token");
      toast.success("Logged out successfully", { duration: 3000 });
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Logout failed", {
        duration: 3000,
      });
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
