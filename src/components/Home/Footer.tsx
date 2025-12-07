import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-6 mt-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bloggy</h2>
          <p className="mt-3 text-sm text-gray-500">
            Your daily dose of stories, ideas, and inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-blue-600 transition">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-sm mb-3 text-gray-500">
            Subscribe to our newsletter for the latest blogs.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href=""
              className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href=""
              className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-blue-400 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href=""
              className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href=""
              className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bloggy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
