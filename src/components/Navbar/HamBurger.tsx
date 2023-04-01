"use client";

import { useState } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="block md:hidden text-gray-300 hover:text-white focus:outline-none z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75 flex items-center justify-center md:hidden"
          onClick={closeMenu}
        >
          <div
            className="space-y-4 py-4 px-6 text-lg text-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/">
              <span
                className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={closeMenu}
              >
                All Books
              </span>
            </Link>
            <Link href="/login">
              <span
                className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={closeMenu}
              >
                Login
              </span>
            </Link>
            <Link href="/new-order">
              <span
                className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={closeMenu}
              >
                Place Order
              </span>
            </Link>
            <Link href="/all-orders">
              <span
                className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={closeMenu}
              >
                All Orders
              </span>
            </Link>
          </div>
        </div>
      )}

      <div className="space-x-4 py-4 sm:py-1 px-6 text-lg text-gray-300 hidden md:block">
        <Link href="/">
          <span className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white">
            All Books
          </span>
        </Link>
        <Link href="/login">
          <span className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white">
            Login
          </span>
        </Link>
        <Link href="/new-order">
          <span className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white">
            Place Order
          </span>
        </Link>
        <Link href="/all-orders">
          <span className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white">
            All Orders
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
