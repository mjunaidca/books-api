const Displaysingle = ({ book }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg">
      {" "}
      <h2 className="text-3xl font-bold mb-4">{book.name}</h2>
      3x text size, bold font and margin bottom
      <p className="text-xl mb-2">Author: {book.author}</p>
      <p className="text-xl mb-2">ISBN: {book.isbn}</p>
      <p className="text-xl mb-2">Type: {book.type}</p>
      <p className="text-xl mb-2">Price: ${book.price}</p>
      <p className="text-xl mb-2">Current Stock: {book.currentStock}</p>
      {book.available ? null : ( // if the single is not available, show a red tag on the single
        <div className="bg-red-500 text-white px-2 py-1 rounded-lg">
          Out of stock
        </div>
      )}
    </div>
  );
};

export default Displaysingle;
