// AllBooksCard.tsx
import Link from "next/link";
import React from "react";
import { BsBook } from "react-icons/bs"; // book icon from react-icons
import { MdCheckCircle, MdCancel } from "react-icons/md"; // check and cross icons from react-icons

interface AllBooksCardProps {
  book: any; // the book data to display
}

const AllBooksCard: React.FC<AllBooksCardProps> = ({ book }) => {
  return (
    <div className="w-72 h-auto bg-gray-100 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
      {" "}
      {book.available ? null : ( // if the book is not available, show a red badge on the top right corner
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
          Out of stock
        </div>
      )}
      <div className="flex items-center mb-4">
        {" "}
        <BsBook className="text-blue-500 mr-2" />
        <span className="text-sm">{book.type}</span>
        <span className="ml-auto">
          {" "}
          {book.available ? ( // if the book is available, show a check icon with green color
            <MdCheckCircle className="text-green-500" />
          ) : (
            // if the book is not available, show a cross icon with red color
            <MdCancel className="text-red-500" />
          )}
        </span>
      </div>
      <div className="mt-auto">
        {" "}
        <h3 className="text-3xl font-bold truncate">{book.name}</h3>
        <p className="text-sm text-gray-600">Book ID: {book.id}</p>
      </div>
      <div className="flex justify-between mt-4">
        {" "}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Order Now
        </button>{" "}
        <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
          <Link href={`./books/${book.id}`}>View Details</Link>
        </button>{" "}
      </div>
    </div>
  );
};

export default AllBooksCard;
