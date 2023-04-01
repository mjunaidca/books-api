"use client";

import Wrapper from "@/components/Wrapper";
import useSWR from "swr";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fetcher = async ({
  url,
  bearer,
}: // orderId,
{
  url: string;
  bearer: string;
  // orderId: any;
}) => {
  const response = await fetch(url, {
    method: "GET", // Specify the method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  return response.json();
};

// To Delete Single Order
const deleteOrder = async ({ url, bearer }: { url: string; bearer: any }) => {
  const res = await fetch(`${url}`, {
    method: "DELETE", // Specify the method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error in Deleting order");
  }
  return res.json();
};

const SingleOrder = ({ params }: { params: { id: string } }) => {
  // const [name, setName] = useState("");
  // const [nameStatus, setNameStatus] = useState(false);

  // if (nameStatus) {
  //   return <h1>Requestrf Name Update!</h1>;
  // }

  const isClient = typeof window !== "undefined";
  const bearer = isClient ? localStorage.getItem("accessToken") : null;
  const myOrderId = params.id;
  const router = useRouter();

  const { data, error } = useSWR(
    bearer
      ? {
          url: `/api/orderinfo/${myOrderId}`,
          bearer: bearer,
          // orderId: myOrderId,
        }
      : null,
    fetcher
  );

  if (error) {
    console.log("error", error.status);
  }

  if (!data) {
    return (
      <div className="justify-center min-h-screen h-full items-center max-w-7xl w-full">
        {" "}
        <Loader />{" "}
        {typeof data !== "undefined" ? `Data type: ${typeof data}` : ""}
      </div>
    );
  }

  console.log("Order Token", data);

  function goBack() {
    router.back();
  }

  async function Submit(orderId: any) {
    console.log("Ca;; Deltete");

    try {
      await deleteOrder({ url: `/api/delete/${orderId}`, bearer: bearer });
      // <Loading />;
      console.error("CLIENT side DELETE function:");

      router.refresh();
      // mutate(`/api/allorders`); // Update the cache after deleting the order
    } catch (error) {
      console.error("Error deleting order:", error);
    }
    router.replace("./all-orders");
  }

  // const handSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setNameStatus(true);
  //   console.log(name);
  // };

  return (
    <Wrapper>
      <div className="text-gray-800 font-semibold bg-white p-6 rounded-xl max-w-sm w-full">
        <div className="my-3">
          <button
            className="bg-gray-300 ring-2 ring-gray-500 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-r-full"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <div>
          <b>Your Order Id:</b> {myOrderId}
        </div>
        <div className="flex flex-col mt-3 space-y-5">
          <div>
            <b> Book ID:</b> {data.bookId}{" "}
          </div>
          <div>
            <b> Customer Name: </b>{" "}
            {data.customerName ? data.customerName : "Anonymous"}
          </div>
          <div>
            <b> Quantity:</b> {data.quantity}{" "}
          </div>
          <div>
            <b> Date & Time:</b> {new Date(data.timestamp).toLocaleString()}{" "}
          </div>
          <div className="flex flex-col gap-4 mt-4 md:gap-2">
            {/* <div className="flex justify-between rounded-lg py-2 items-center">
              <textarea
                className="bg-gray-100"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handSubmit}
              >
                Update Name
              </button>
            </div> */}
            <button
              onClick={() => Submit(data.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-b-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleOrder;
