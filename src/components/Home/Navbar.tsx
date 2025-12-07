"use client";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/auth";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { isAuthenticated, logout, isAuthenticatedLoading, user } =
    useAuthStore();
  const router = useRouter();

  const logoutButton = () => {
    logout();
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Blogify
        </Link>

        {/* Right Side */}
        {isAuthenticatedLoading ? (
          <div className="flex gap-3">
            <div className="w-28 h-10 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <>
            {isAuthenticated ? (
              <div className="relative">
                <button className="focus:outline-none">
                  <Image
                    src={user?.image || "/user.png"}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer border"
                    onClick={() => {
                      const menu = document.getElementById("user-menu");
                      menu?.classList.toggle("hidden");
                    }}
                  />
                </button>

                {/* Dropdown */}
                <div
                  id="user-menu"
                  className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                >
                  <button
                    onClick={() => {
                      router.push("/profile");
                      document
                        .getElementById("user-menu")
                        ?.classList.add("hidden");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      router.push("/dashboard");
                      document
                        .getElementById("user-menu")
                        ?.classList.add("hidden");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logoutButton();
                      document
                        .getElementById("user-menu")
                        ?.classList.add("hidden");
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Sign in
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
