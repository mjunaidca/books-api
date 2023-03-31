import { url } from "@/utils/variables";
import Link from "next/link";

// get single Book
async function getBook(bookId: number) {
  const res = await fetch(`${url}/books/${bookId}`);
  if (!res.ok) {
    throw new Error("Error in getting data about the book");
  }
  return res.json();
}

export async function generateStaticParams() {
  const id: number[] = [1, 2, 3, 4, 5, 6];

  return id.map((id) => ({
    bookId: id,
  }));
}

export default async function DisplayBook({
  params,
}: {
  params: { bookId: number };
}) {
  const book = await getBook(params.bookId);

  return (
    <div className="flex bg-gray-900 justify-center items-center h-screen">
      {" "}
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg relative">
        {book.available ? null : ( // if the single is not available, show a red tag within the card
          <div className="bg-red-500 text-white px-2 py-1 rounded-lg absolute top-0 right-0 m-2">
            Out of stock
          </div>
        )}
        <h2 className="text-3xl font-bold mb-4">{book.name}</h2>
        <p className="text-lg text-gray-700 mb-2">Author: {book.author}</p>
        <div className="flex flex-col text-lg md:text-xl justify-between space-y-4 w-full m-2">
          <p>ISBN: {book.isbn ? book.isbn : "No ISBN"}</p>
          <p>Type: {book.type}</p>
          <p>Price: ${book.price}</p>
          <p>Current Stock: {book[`current-stock`]}</p>
        </div>
        <div className="flex justify-evenly w-full m-4 ">
          {" "}
          <button
            className={
              book.available
                ? "bg-green-500 text-white px-4 py-2 rounded-lg" // only buy now button shall be light green
                : "bg-gray-500 text-white px-4 py-2 rounded-lg" // if the single is not available, change the button color to gray
            }
          >
            Buy Now
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
