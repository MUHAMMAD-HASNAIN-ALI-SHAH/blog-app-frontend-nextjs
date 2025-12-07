"use client";
import { useEffect } from "react";
import useAuthStore from "./store/auth";

const Verify = () => {
  const { verify } = useAuthStore();

  useEffect(() => {
    verify();
  }, []);
  return null;
};

export default Verify;
