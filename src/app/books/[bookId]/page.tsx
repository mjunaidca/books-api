import ClientButton from "@/components/ClientButton";
import Wrapper from "@/components/Wrapper";
import { API_URL } from "@/utils/variables";
import Link from "next/link";

// get single Book
async function getBook(bookId: number) {
  const res = await fetch(`${API_URL}/books/${bookId}`);
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
  const books = await getBook(params.bookId);

  return (
    <Wrapper>
        {/* <div className="flex max-w-xs sm:max-w-md  md:max-w-lg w-full flex-col relative items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg "> */}
        <div className="max-w-xs  ">
          <div className=" top-0">
            {books.available ? null : (
              <div className="bg-red-500/30 text-white px-8 py-2 flex justify-items-start justify-start rounded-lg m-2">
                Out of stock
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{books.name}</h2>
            <p className="text-lg text-gray-700 mb-5">Author: {books.author}</p>
          </div>

          <div className="flex flex-col text-lg md:text-lg justify-between space-y-4 w-full m-2">
            <p>
              <b>ISBN:</b> {books.isbn ? books.isbn : "No ISBN"}
            </p>
            <p>
              <b>Type:</b> {books.type}
            </p>
            <p>
              <b>Price:</b> ${books.price}
            </p>
            <p>
              <b>Current Stock:</b> {books[`current-stock`]}
            </p>
          </div>
          <div className="flex flex-col justify-evenly w-full m-4 gap-1 ">
            <Link
              className="bg-blue-500 font-semibold text-white px-4 py-2 text-center rounded-lg hover:bg-blue-600 "
              href="./login"
            >
              {" "}
              Register
            </Link>
            <ClientButton />
          </div>
        </div>
    </Wrapper>
  );
}
