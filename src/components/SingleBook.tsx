import { BlueButton } from "./Buttons/BlueButton";
import ClientButton from "./Buttons/ClientButton";
import { BsFillCheckCircleFill, BsBookmarkCheck } from "react-icons/bs";
import { IconLabelText } from "./IconLabelText";

interface SingleBookProps {
  id: number;
  name: string;
  author: string;
  isbn: string;
  type: string;
  price: number;
  currentStock: number;
  avalible: boolean;
}

const SingleBook = ({
  id,
  name,
  author,
  isbn,
  type,
  price,
  currentStock,
  avalible,
}: SingleBookProps) => {
  return (
    <div className="flex flex-col justify-start -mt-10 sm:-mt-1 max-w-sm w-full bg-gray-100 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 px-3 sm:px-8 m-4">
      <div>
        <div className="flex justify-between items-center">
          <IconLabelText Icon={BsBookmarkCheck} Label="Book ID:" Text={id} />
          <div>
            {avalible ? (
              <BsFillCheckCircleFill className="text-green-500" />
            ) : (
              <p className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
                {" "}
                Out of Stock
              </p>
            )}
          </div>
        </div>
        <div className="font-bold text-3xl mt-4">{name}</div>
        <div className="text-gray-700 text-base mt-1">{author}</div>
      </div>
      <div className="my-6 text-lg flex flex-col space-y-4 ">
        <h4>
          {" "}
          <b>ISBN:</b> {isbn ? isbn : "No ISBN"}
        </h4>
        <h4>
          <b>Type:</b> {type}
        </h4>
        <h4>
          {" "}
          <b>Price:</b> ${price}
        </h4>
        <h4>
          {" "}
          <b>Current Stock:</b> {currentStock}
        </h4>
      </div>
      <div>
        <div>
          <BlueButton href={`/login`} text={`Register`} />
        </div>
        <div>
          <ClientButton />
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
