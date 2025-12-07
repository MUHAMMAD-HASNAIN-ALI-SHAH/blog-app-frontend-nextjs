import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import Verify from "@/Verify";
import '@mantine/core/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloggy - A Blogging Platform",
  description: "A modern blogging platform built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black overflow-x-hidden`}
      >
        <Navbar />
        <Verify />
        <MantineProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </MantineProvider>
        <Footer />
      </body>
    </html>
  );
}
