"use client";
import DashboardData from "./DashboardData";
import { useEffect, useState } from "react";
import useBlogStore from "../../store/blog";
import DashboardBlogs from "./DashboardBlogs";
import DashboardSkeletonData from "../skeleton/DashboardSkeletonData";
import DashboardSkeletonBlogs from "../skeleton/DashboardSkeletonBlogs";

const DashboardMain = () => {
  const { getBlogs, getStats } = useBlogStore();
  const [dataLoader, setDataLoader] = useState(false);
  const [blogLoader, setBlogLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setBlogLoader(true);
      await getBlogs();
      setBlogLoader(false);
    };

    const fetchLikesAndComments = async () => {
      setDataLoader(true);
      await getStats();
      setDataLoader(false);
    };

    fetchLikesAndComments();

    fetchData();
  }, [getBlogs, getStats]);

  return (
    <div className="w-full mt-20">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="w-full">
          {dataLoader ? <DashboardSkeletonData /> : <DashboardData />}
        </div>

        <div className="w-full">
          {blogLoader ? <DashboardSkeletonBlogs /> : <DashboardBlogs />}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
