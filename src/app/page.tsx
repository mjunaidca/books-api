import { API_URL } from "@/utils/variables";
import { ALLBOOKPROPS } from "@/utils/types";
import Wrapper from "@/components/Wrapper";
import BookCard from "@/components/BookCard";

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
      <div className="flex flex-wrap w-full max-w-none justify-center ">
        {books.map((book: ALLBOOKPROPS, index: number) => (
          <BookCard
            key={index}
            id={book.id}
            name={book.name}
            type={book.type}
            avalible={book.available}
          />
        ))}
      </div>
    </Wrapper>
  );
}
