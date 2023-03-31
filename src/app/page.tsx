import { url } from "@/utils/variables";
import Link from "next/link";
import AllBooks from "@/views/AllBooks";
// import { orderBook } from "../app/components/order-book";

// get all Books
async function getBooksList() {
  const res = await fetch(`${url}/books`);
  if (!res.ok) {
    throw new Error("Error in getting all books");
  }
  return res.json();
}

type Props = {
  id: string;
  type: string;
  name: string;
  avalible: boolean;
};

export default async function Home() {
  const books = await getBooksList();
  console.log(books);

  // const fictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'fiction')
  // const nonFictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'non-fiction')

  return (
    <div className="bg-gray-900 flex container max-h-screen h-screen max-w-full w-full items-center justify-center overflow-y-auto">
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {books.map(
          (
            book: any // map over the books array and render a card component for each book
          ) => (
            <div key={book.id} className="flex basis-1/4 w-full">
              <AllBooks book={book} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
