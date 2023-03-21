import { url } from "@/utils/variables";

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
  // console.log(booksList);

  // const fictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'fiction')
  // const nonFictionBooks = booksList.filter((books: { id: string, type: string, name: 'string', avalible: boolean }) => books.type === 'non-fiction')
  // console.log(fictionBooks);

  return (
    <div className='bg-gray-300 min-h-screen flex justify-center items-center'>
      <div className=" bookCardGrid">
        {booksList.map(({ id, type, name, avalible }: { id: string, type: string, name: string, avalible: boolean }) => (
          <div key={id} className="bookCard">
            <h1>{name}</h1>
            <p>{type}</p>
            <button>Check Details</button>
          </div>
        ))}
      </div>


    </div >
  )
}
