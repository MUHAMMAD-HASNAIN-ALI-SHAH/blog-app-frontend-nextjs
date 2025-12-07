"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";

const Page = () => {
  const { signin, authLoader, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      email: /^\S+@\S+$/.test(email) ? "" : "Invalid email",
      password: password.length > 0 ? "" : "Please enter your password",
    };
    setError(errors);

    if (errors.email || errors.password) return;

    const result = await signin({ email, password });
    if (result === 1) router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Sign in to continue
        </h1>
        <p className="text-gray-600 mb-6">
          Please enter your email and password
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.email && (
            <p className="text-sm text-red-500 mt-1">{error.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.password && (
            <p className="text-sm text-red-500 mt-1">{error.password}</p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-600">
            No account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-blue-600 hover:underline font-medium"
            >
              Signup
            </button>
          </p>

          <button
            type="submit"
            disabled={!!authLoader}
            className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
              authLoader
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {authLoader ? "Signing in..." : "Signin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
