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
      <div className=" m-2 sm:m-4 md:m-8 md:p-32 sm:p-12 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {booksList.map(({ id, type, name, avalible }: { id: string, type: string, name: string, avalible: boolean }) => (
          <div key={id} className="bg-white text-center rounded-3xl flex flex-col w-full p-11 justify-between min-h-[50%]">
            <div className='align-top text-2xl xl:text-3xl font-bold text-blue-500 '>{name}</div>
            <div className='pt-6 pb-8 text-lg text-gray-800 font-semibold capitalize'>{type}</div>
            <button className='text-lg text-gray-600 mx-auto hover:bg-blue-500 hover:text-white rounded-xl ring-2 ring-blue-600 py-1 px-2 '>Check Details</button>
          </div>
        ))}
      </div>


    </div >
  )
}
