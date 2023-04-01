"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../loading";

// To Get Single Order
const fetcher = async ({ url, bearer }: { url: string; bearer: string }) => {
  const res = await fetch(`${url}`, {
    method: "GET", // Specify the method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error in getting order");
  }
  return res.json();
};

// To Delete Single Order
// const deleteOrder = async ({ url, bearer }: { url: string; bearer: any }) => {
//   const res = await fetch(`${url}`, {
//     method: "DELETE", // Specify the method
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${bearer}`,
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Error in Deleting order");
//   }
//   return res.json();
// };

const AllOrders = () => {
  const isClient = typeof window !== "undefined";
  const bearer = isClient ? localStorage.getItem("accessToken") : null;
  const [del, setDel] = useState(false);
  const router = useRouter();

  console.log("Token from Client", bearer);

  const { data, error } = useSWR(
    { url: `/api/allorders`, bearer: bearer },
    fetcher
  );

  if (error) {
    console.log(error.status);
  }

  if (!data) {
    return (
      <div className="justify-center items-center max-w-7xl w-full min-h-screen">
        {" "}
        <Loading />{" "}
        {typeof data !== "undefined" ? `Data type: ${typeof data}` : ""}
      </div>
    );
  }

  console.log(data);

  // async function Submit(orderId: any) {
  //   setDel(true);
  //   console.log("Ca;; Deltete");

  //   try {
  //     await deleteOrder({ url: `/api/delete/${orderId}`, bearer: bearer });
  //     // <Loading />;
  //     console.error("CLIENT side DELETE function:");

  //     router.refresh();
  //     // mutate(`/api/allorders`); // Update the cache after deleting the order
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //   }
  //   router.replace("./all-orders");
  // }

  return (
    <div className="flex flex-wrap px-8 justify-center items-center   max-h-screen h-full">
      {Array.isArray(data) &&
        data?.map(
          ({
            id,
            bookId,
            customerName,
            quantity,
            timestamp,
          }: {
            id: string;
            bookId: number;
            customerName: string;
            quantity: number;
            timestamp: number;
          }) => (
            <div key={id} className="flex flex-wrap mx-auto md:mx-4 my-4">
              <div className="bg-white flex flex-col gap-4 shadow-md rounded-lg p-6 border border-gray-200 mb-4 cursor-pointer">
                <Link href={`./all-orders/${id}`}>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold  mb-4 text-gray-800">
                      <b>Book ID:</b> {bookId}
                    </h3>
                    <p className="text-gray-700">
                      <b>Customer Name:</b>{" "}
                      {customerName ? customerName : "Anonymous"}
                    </p>
                    <p className="text-gray-700">
                      {" "}
                      <b>Quantity:</b> {quantity}
                    </p>
                    <p className="text-gray-700">
                      <b>Time: </b> {new Date(timestamp).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      {" "}
                      <b>Order ID: </b> {id}
                    </p>
                  </div>
                </Link>
                <div className="flex flex-col gap-4 mt-4 md:gap-2">
                  {/* <button
                    onClick={() => Submit(id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto"
                  >
                    Delete
                  </button> */}
                  <button
                    onClick={() => router.push(`./all-orders/${id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default AllOrders;
