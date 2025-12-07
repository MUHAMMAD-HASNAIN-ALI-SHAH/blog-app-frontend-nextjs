"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="mt-12 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Our Blogging Hub
        </h1>
        <p className="text-gray-600 text-sm md:text-lg mb-8 leading-relaxed">
          Share your thoughts, explore insightful articles, and connect with a
          community of passionate writers. Whether you're here to learn,
          express, or inspire, this is your space to create and discover new
          ideas.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Get Started ⬇️
        </button>
      </div>
    </section>
  );
};

export default Hero;
