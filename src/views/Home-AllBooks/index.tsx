import { API_URL } from "@/utils/variables";
import DisplayInterface from "./DisplayInterface";
import { ALLBOOKPROPS } from "@/utils/types";
import Wrapper from "@/components/Wrapper";

async function getBooksList() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) {
    throw new Error("Error in getting all books");
  }
  return res.json();
}

export default async function HomeAllBooks() {
  const books = await getBooksList();
  console.log(books);

  // const fictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'fiction')
  // const nonFictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'non-fiction')

  return (
    <Wrapper>
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {books.map((book: ALLBOOKPROPS) => (
          <div key={book.id} className="flex basis-1/4 w-full">
            <DisplayInterface book={book} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
