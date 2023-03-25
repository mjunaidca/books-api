import { url, registedUserData } from "@/utils/variables";
import Link from "next/link";
// import { clientToken } from '../app/components/token'
import { orderBook } from '../app/components/order-book'

// get all Books
async function getBooksList() {
  const res = await fetch(`${url}/books`)
  if (!res.ok) {
    throw new Error('Error in getting all books')
  }
  return res.json();
}

export default async function Home() {
  const booksList = await getBooksList();
  // const tokenID = await clientToken({ registedUserData });

  // console.log(tokenID.accessToken);

  // const fictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'fiction')
  // const nonFictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'non-fiction')

  return (
    <div className=" bookCardGrid">
      {booksList.map(({ id, type, name, avalible }: { id: string, type: string, name: string, avalible: boolean }) => (
        <div key={id} className="bookCard">
          <h1>{name}</h1>
          <p>{type} </p>
          <button><Link href={`/${id}`} > Check Details </Link></button>
          {/* <button><Link href={`/${id}`} > Order Now </Link></button> */}
        </div>
      ))}
    </div>
  )
}
