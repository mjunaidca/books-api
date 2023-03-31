// "use client"; // AllBooksCard.tsx
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import ClientButton from "@/components/ClientButton";

interface BookProps {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

const AllBooksCard = ({ book }: { book: BookProps }) => {
  return (
    <div className="max-w-xs w-full h-auto bg-gray-100 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 px-8">
      <div>
        {" "}
        {book.available ? null : ( // if the book is not available, show a red badge on the top right corner
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
            Out of stock
          </div>
        )}
        {/* top icons */}
        <div className="flex items-center mb-4">
          {" "}
          <BsBook className="text-blue-500 mr-2" />
          <span className="text-sm">{book.type}</span>
          <span className="ml-auto">
            {" "}
            {book.available ? (
              <MdCheckCircle className="text-green-500" />
            ) : (
              <MdCancel className="text-red-500" />
            )}
          </span>
        </div>
        {/* Heading */}
        <div className="mt-auto">
          {" "}
          <h3 className="text-3xl font-bold">{book.name}</h3>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <div className="flex flex-col flex-1 w-full  ">
          {/* // icons */}
          <div className="flex items-center justify-between flex-1 py-6 mt-auto">
            <div className="flex items-center justify-between w-full space-x-1">
              <p className="flex justify-center items-center gap-3 text-sm text-gray-600">
                <AiFillStar className="text-yellow-500" />
                Book ID: {book.id}
              </p>
              <RiMoneyDollarCircleFill className="text-green-500" />
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Link href={`./books/${book.id}`}>View Details</Link>
          </button>{" "}
          <ClientButton bookAvailalbe={book.available} />
        </div>
      </div>
    </div>
  );
};

export default AllBooksCard;
