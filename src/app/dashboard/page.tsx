"use client";

import DashboardMain from "@/components/Dashboard/DashboardMain";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, isAuthenticatedLoading } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticatedLoading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, isAuthenticatedLoading, router]);

  if (isAuthenticatedLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="w-32 h-32 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <DashboardMain />;
};

export default Dashboard;
