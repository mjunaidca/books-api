"use client";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = async ({
  bookId,
  token,
  clientName,
  url,
}: {
  bookId: string;
  token: string;
  clientName: string;
  url: string;
}) => {
  // const clientName = window.localStorage.getItem("name");

  // const token = window.localStorage.getItem("accessToken");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ clientName: clientName, bookId: bookId }),
  });

  console.log("Token in fetcher:", token);
  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  const data = await response.json();

  return data;
};

const OrderPage = () => {
  const [bookId, setbookId] = useState("");
  const [callSWR, setCallSWR] = useState(false);

  const isClient = typeof window !== "undefined";
  const bearer = isClient ? localStorage.getItem("accessToken") : null;
  const name = isClient ? localStorage.getItem("name") : null;

  const { data, error } = useSWR(
    callSWR
      ? {
          url: `/api/order`,
          clientName: name,
          bookId: bookId,
          token: bearer,
        }
      : null,
    fetcher
  );

  if (data) {
    console.log("Order Token", data.orderId);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Token before calling fetcher:", bookId);

    setCallSWR(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-md mx-4">
        <form>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800">
            Order Confirmation
          </h2>
          {callSWR && (
            <div className="SuccessText mb-8 text-center">
              <p className="text-green-700 font-semibold mb-1">
                Your Order Id:
              </p>
              <p className="text-gray-800 mb-4">
                {data ? `${data.orderId || data.error}` : `Loading...`}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/"
                  className="SuccessButton px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Browse Books
                </Link>
                <Link
                  href="/all-orders"
                  className="SuccessButton px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  All Orders
                </Link>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="bookId"
            >
              Book ID
            </label>
            <input
              className="border w-full p-2 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              type="text"
              name="bookId"
              id="bookId"
              placeholder="Enter book ID"
              value={bookId}
              onChange={(e) => setbookId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
              // disabled={!clientName || !token || !bookId}
              onClick={handleSubmit}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
