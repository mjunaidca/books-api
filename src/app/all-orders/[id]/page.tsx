"use client";

import Wrapper from "@/components/Wrapper";
import useSWR from "swr";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

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

const SingleOrder = ({ params }: { params: { id: string } }) => {
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
      <div className="justify-center items-center max-w-7xl w-full min-h-screen">
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

  return (
    <Wrapper>
      <div className="text-gray-800 font-semibold bg-white p-6 rounded-xl max-w-sm w-full">
        <b>Your Order Id:</b> {myOrderId}
        <div className="flex flex-col mt-3 space-y-5">
          <div>
            <b> Book ID:</b> {data.bookId}{" "}
          </div>
          <div>
            Customer Name: {data.customerName ? data.customerName : "Anonymous"}
          </div>
          <div>
            <b> Quantity:</b> {data.quantity}{" "}
          </div>
          <div>
            <b> Date & Time:</b> {new Date(data.timestamp).toLocaleString()}{" "}
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={goBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleOrder;
