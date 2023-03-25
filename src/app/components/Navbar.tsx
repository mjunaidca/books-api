// components/Navbar.js
"use client";

// components/Navbar.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Navbar = () => {
  const [bookId, setBookId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (bookId.trim()) {
      router.push(`/book/${bookId}`);
    }
  };

  return (
    <nav className="bg-gray-800 py-3">
      <div className="max-w-7xl px-4 flex mx-auto space-x-4 flex-wrap justify-between">
        <div className="  flex-grow-0 sm:flex-grow">
          <Link
            href="/"
            className="hidden sm:block text-white text-2xl font-semibold"
          >
            My App
          </Link>
        </div>

        <div className="space-x-4 py-4 sm:py-1 px-6 text-lg text-gray-300 ">
          <Link href="/">All Books</Link>
          <Link href="/login" className="hover:text-white">
            Get Token
          </Link>
          <Link href="/new-order" className="hover:text-white">
            Place Order
          </Link>
          <Link href="/all-orders" className="hover:text-white">
            All Orders
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex  justify-end  items-center space-x-2"
        >
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="rounded bg-white text-black px-3 py-1 focus:outline-none"
            placeholder="Enter Book ID"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Go
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
