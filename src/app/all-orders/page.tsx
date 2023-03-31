"use client";
import useSWR from "swr";
import React from "react";
import Link from "next/link";

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

const AllOrders = () => {
  const isClient = typeof window !== "undefined";

  const bearer = isClient ? localStorage.getItem("accessToken") : null;

  console.log("Token from Client", bearer);

  const { data, error } = useSWR(
    { url: `/api/allorders`, bearer: bearer },
    fetcher
  );

  if (error) {
    console.log(error.status);
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-wrap px-8 justify-center items-center   max-h-screen h-full">
      {data.map(
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
                    Book ID: {bookId}
                  </h3>
                  <p className="text-gray-700">Customer Name: {customerName}</p>
                  <p className="text-gray-700">Quantity: {quantity}</p>
                  <p className="text-gray-700">
                    Time: {new Date(timestamp).toLocaleString()}
                  </p>
                  <p className="text-gray-700">Order ID: {id}</p>
                </div>
              </Link>
              <div className="flex flex-col gap-4 mt-4 md:gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto">
                  <Link href={`./`}> Delete Order </Link>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full md:w-auto">
                  <Link href={`./`}> Update Name </Link>
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
