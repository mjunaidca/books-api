"use client";

// components/Navbar.js
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [bookId, setBookId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (bookId.trim()) {
      router.push(`/books/${bookId}`);
    }
  };

  return (
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
  );
};

export default SearchBar;
