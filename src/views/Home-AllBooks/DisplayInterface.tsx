import { BsBook } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { ALLBOOKPROPS } from "@/utils/types";
import ClientButton from "@/components/ClientButton";
import { BlueButton } from "@/components/BlueButton";
import { CardWrapper, IconLabelText } from "@/components/CardSmallComps";

const DisplayInterface = ({ book }: { book: ALLBOOKPROPS }) => {
  return (
    <CardWrapper>
      <div className="max-w-xs">
        {/* Heading And Top Icons */}
        <div>
          {/* top icons */}
          <div className="flex items-center mb-4">
            <IconLabelText Icon={BsBook} Text={book.type} />
            <span className="ml-auto">
              {" "}
              {book.available ? (
                <MdCheckCircle className="text-green-500" />
              ) : (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
                  Out of stock
                </div>
              )}
            </span>
          </div>

          {/* Heading */}
          <div className="mt-auto">
            {" "}
            <h3 className="text-3xl font-bold">{book.name}</h3>
          </div>
        </div>

        <div className="flex flex-col flex-1 ">
          {/* // icons */}
          <div className="flex items-center justify-between flex-1 py-6 mt-auto">
            <IconLabelText Icon={AiFillStar} Label="Book ID:" Text={book.id} />
            <IconLabelText
              Icon={RiMoneyDollarCircleFill}
              Label="Available:"
              Text={book.available ? "true" : "false"}
            />
          </div>
          {/* Buttons */}
          <BlueButton href={`./books/${book.id}`} text={`View Details`} />
          <ClientButton />
        </div>
      </div>
    </CardWrapper>
  );
};

export default DisplayInterface;
