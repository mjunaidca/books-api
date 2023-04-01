import ClientButton from "@/components/Buttons/ClientButton";
import SingleBook from "@/components/SingleBook";
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
      <SingleBook
        id={books.id}
        name={books.name}
        author={books.author}
        isbn={books.isbn}
        type={books.type}
        price={books.price}
        currentStock={books[`current-stock`]}
        avalible={books.available}
      />
    </Wrapper>
  );
}
