import { url } from "@/utils/variables";
import Link from "next/link";
// import { orderBook } from "../app/components/order-book";

// get all Books
async function getBooksList() {
  const res = await fetch(`${url}/books`);
  if (!res.ok) {
    throw new Error("Error in getting all books");
  }
  return res.json();
}

export default async function Home() {
  const booksList = await getBooksList();
  // const tokenID = await clientToken({ registedUserData });

  // const fictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'fiction')
  // const nonFictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'non-fiction')

  return (
    <div className=" bookCardGrid">
      {booksList.map(
        ({
          id,
          type,
          name,
          avalible,
        }: {
          id: string;
          type: string;
          name: string;
          avalible: boolean;
        }) => (
          <div key={id} className="bookCard">
            <h1>{name}</h1>
            <p>{type} </p>
            <div className="flex flex-col gap-4">
              <button>
                <Link href={`/book/${id}`}> Check Details </Link>
              </button>
              <button>
                <Link href={`./new-order`}> Order Now </Link>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
