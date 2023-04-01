"use client";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { InputWithLabel } from "@/components/InputWithLabel";
import { RingButton } from "@/components/Buttons/RingButton";

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
  const [submitted, SetSubmitted] = useState(false);

  const isClient = typeof window !== "undefined";
  const bearer = isClient ? localStorage.getItem("accessToken") : null;
  const name = isClient ? localStorage.getItem("name") : null;

  const router = useRouter();

  const { data, error } = useSWR(
    callSWR
      ? {
          url: `/api/placeorder`,
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
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-h-96 h-auto max-w-lg p-8 rounded-xl shadow-md mx-4"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-gray-800">
          Order Confirmation
        </h2>
        <div className="relative">
          {callSWR && (
            <div className="mb-8 text-center">
              <p className="text-green-600 font-semibold mb-1">
                Your Order Status:
              </p>
              {data ? (
                `${(data.orderId && "Order Placed!") || data.error}`
              ) : (
                <div className="loader-wrapper relative">
                  {" "}
                  {/* Add a wrapper */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {/* Set the loader's position to absolute and use z-index */}
                    <Loading />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center text-sm md:text-base mt-4 justify-center space-x-2 md:space-x-8">
                <RingButton href="/" text="Browse" />
                <RingButton href="/all-orders" text="Orders" />
              </div>
            </div>
          )}
        </div>
        <InputWithLabel
          label="Book ID"
          value={bookId}
          onChange={(e) => setbookId(e.target.value)}
        />

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            disabled={!bookId}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
