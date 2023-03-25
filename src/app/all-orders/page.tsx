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
    <div className="">
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
          <div key={id} className="bookCard">
            <div className="bg-white shadow-md rounded-md p-4 border border-gray-200 mb-4">
              <h3 className="text-xl font-semibold mb-2">Book ID: {bookId}</h3>
              <p>Customer Name: {customerName}</p>
              <p>Quantity: {quantity}</p>
              <p>Time: {new Date(timestamp).toLocaleString()}</p>
              <p>Order ID: {id}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button>
                <Link href={`./`}> Delete Order </Link>
              </button>
              <button>
                <Link href={`./`}> Update Name </Link>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllOrders;
