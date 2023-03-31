"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

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
  const [clientName, setClientName] = useState("");
  const [bookId, setbookId] = useState("");
  const [token, settoken] = useState("");
  const [callSWR, setCallSWR] = useState(false);

  const router = useRouter();

  const { data, error } = useSWR(
    callSWR
      ? {
          url: `/api/order`,
          clientName: clientName,
          bookId: bookId,
          token: token,
        }
      : null,
    fetcher
  );

  if (data) {
    console.log("Order Token", data.orderId);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Token before calling fetcher:", token);
    console.log("Token before calling fetcher:", clientName);
    console.log("Token before calling fetcher:", bookId);

    setCallSWR(true);
  };

  const OrderPage = () => {
    router.push(`./all-orders`);
  };

  const allBooks = () => {
    router.push(`./`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-7xl min-h-fit min-w-fit md:min-h-[500px] md:min-w-[500px] p-8 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Place an Order
          </h2>
          {callSWR && (
            <div className="SuccessText">
              <p className="text-green-700">Your Order Id:</p>
              <p>{data ? data.orderId : `Loading...`}</p>
              <button onClick={allBooks} className="SuccessButton">
                Browse More Books
              </button>
              <button onClick={OrderPage} className="SuccessButton">
                View All Orders
              </button>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="customerName"
            >
              Customer Name
            </label>
            <input
              className="border w-full p-2 rounded focus:border-blue-500 focus:outline-none"
              type="text"
              name="clientName"
              id="customerName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="bookId"
            >
              Book ID
            </label>
            <input
              className="border w-full p-2 rounded focus:border-blue-500 focus:outline-none"
              type="text"
              name="bookId"
              id="bookId"
              placeholder="Enter book ID"
              value={bookId}
              onChange={(e) => setbookId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="authToken"
            >
              Authentication Token
            </label>
            <input
              className="border w-full p-2 rounded focus:border-blue-500 focus:outline-none"
              type="password"
              name="authToken"
              id="authToken"
              placeholder="Enter authentication token"
              value={token}
              onChange={(e) => settoken(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={!clientName || !token || !bookId}
              type="submit"
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
