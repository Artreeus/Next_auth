"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { ModeToggle } from "../shared/themeButton"; 

type userProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

const Navbar = ({ session }: { session: userProps | null }) => {
  // State to manage mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full mx-auto flex items-center justify-between py-4 px-6 bg-glassmorphism container mt-2">
      {/* Left section with the hamburger menu for mobile */}
      <div className="flex items-center">
        <div className="relative lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-md "
            onClick={toggleMenu} // Toggle menu when clicked
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white" // Ensure the hamburger icon is white
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile menu dropdown */}
          {menuOpen && (
            <ul
              tabIndex={0}
              className="absolute mt-3 z-10 p-2 shadow-md bg-glassmorphism text-white rounded-md w-52 .text-glassmorphism"
            >
              <li className="py-2 px-4 text-glassmorphism">
                <Link href="/">Home</Link>
              </li>
              <li className="py-2 px-4 text-glassmorphism">
                <Link href="/about">About Us</Link>
              </li>
              <li className="py-2 px-4 text-glassmorphism">
                <Link href="/support">Support</Link>
              </li>
            </ul>
          )}
        </div>
        <Link
          href="/"
          className="ml-4 text-xl font-semibold text-white hover:text-gray-200"
        >
          NextAuth
        </Link>
      </div>

      {/* Navbar Links for Desktop */}
      <div className="hidden lg:flex">
        <ul className="flex space-x-6 text-white .bg-glassmorphism">
          <li className="hover:text-gray-200">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/projects">My Projects</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/contact">Contact Me</Link>
          </li>
          <li className="hover:text-gray-200 hidden">
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>

      {/* User session or login button */}
      <div className="flex items-center">
        {session?.user ? (
          <button
            className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-black transition duration-200"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          // <Link
          //   href="/login"
          //   className="bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600 transition duration-200"
          // >
          //   Login
          // </Link>
          <ModeToggle />
        )}
      </div>
      
    </div>
  );
};

export default Navbar;
