"use client";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa"; 

const ClientButton = () => {

  const isClient = typeof window !== "undefined";

  const bearer = isClient ? localStorage.getItem("accessToken") : null;

  const router = useRouter();

  const OrderRedirect = () =>
    bearer ? router.push(`./new-order`) : router.push(`./login`);

  return (
    <button
      onClick={OrderRedirect}
      className={`flex items-center justify-center font-semibold w-full py-2 mt-2 text-white rounded-b-lg bg-yellow-500 shadow-md hover:bg-yellow-600`}
      // disabled={!bookAvalible}
    >
      <FaShoppingCart className="mr-2 animate-bounce duration-1000" />
      Order Now
    </button>
  );
};

export default ClientButton;
