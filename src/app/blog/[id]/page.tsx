"use client";
import { useEffect } from "react";
import BlogData from "../../../components/Blog-Data/BlogData"

const Page = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full mt-20">
      <div className="w-full sm:w-7xl mx-auto">
        <BlogData/>
      </div>
    </div>
  )
}

export default Page
