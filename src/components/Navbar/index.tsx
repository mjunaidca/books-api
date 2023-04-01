// components/Navbar.js

import Link from "next/link";
import SearchBar from "./searchbar";

const Nav = () => {
  return (
    <nav className="bg-black py-3">
      <div className="max-w-7xl px-4 flex mx-auto space-x-4 flex-wrap justify-between">
        <div className=" flex gap-4 sm:gap-8 flex-grow-0 sm:flex-grow">
          <Link
            href="/"
            className="hidden sm:block text-white text-2xl font-semibold"
          >
            Books API
          </Link>
          <SearchBar />
        </div>

        <div className="space-x-4 py-4 sm:py-1 px-6 text-lg text-gray-300 ">
          <Link href="/">All Books</Link>
          <Link href="/login" className="hover:text-white">
            Register
          </Link>
          <Link href="/new-order" className="hover:text-white">
            Place Order
          </Link>
          <Link href="/all-orders" className="hover:text-white">
            All Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
