import { BlueButton } from "./Buttons/BlueButton";
import ClientButton from "./Buttons/ClientButton";
import { IconLabelText } from "./IconLabelText";
import {
  BsBookmarkCheck,
  BsJournalBookmark,
  BsFillCheckCircleFill,
  BsBookHalf,
} from "react-icons/bs";

interface BookProps {
  id: number;
  name: string;
  type: string;
  avalible: boolean;
}

const BookCard = ({ id, name, type, avalible }: BookProps) => {
  return (
    <div className="flex flex-col justify-between max-w-sm w-full bg-gray-100 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 px-8 m-4">
      {/* Icons + Heading */}
      <div>
        <div className="flex justify-between ">
          <IconLabelText Icon={BsBookHalf} Text={type} />
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
        <div className="font-bold text-3xl mt-4">
          <h1> {name}</h1>{" "}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <IconLabelText Icon={BsBookmarkCheck} Label="Book ID:" Text={id} />
          <IconLabelText
            Icon={BsJournalBookmark}
            Label="Avalible:"
            Text={avalible ? "true" : "false"}
          />
        </div>
        <div className="mt-4">
          <div>
            <BlueButton href={`./books/${id}`} text={`View Details`} />
          </div>
          <div>
            <ClientButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
