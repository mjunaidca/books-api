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
    <div className="container m-4 max-w-2xl w-full">
      Display Book: {params.bookId}
      <div className="bookCard">
        <div className="  w-full flex flex-col justify-between items-stretch sm:flex-row border-2 sm:border-0 p-2 rounded-2xl border-gray-300">
          <div className="basis-3/5 text-start sm:text-start sm:border-2 sm:border-gray-300 rounded-3xl p-0 sm:p-6">
            <h1>{book.name}</h1>
            <h3 className="pt-4 text-gray-400 justify-items-start">
              Author: {book.author}
            </h3>
            <p>
              {" "}
              <span>Type: </span> {book.type}
            </p>
          </div>
          <div className="flex flex-col w-full items-center justify-around basis-1/5">
            <h4 className="text-lg font-semibold">
              Stock: {book[`current-stock`]}
            </h4>
            <h4 className="text-lg font-semibold">Price: ${book.price}</h4>
            {/* <div className="flex flex-col space-y-3"> */}
            <button>
              <Link href="/new-order">Buy Now</Link>
            </button>
            <button>
              <Link href="/login">Get Token</Link>
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
