"use client";
import { url } from "@/utils/variables";
import { OrderInfo } from "@/app/api/orderinfo/route";
import { bearer } from "@/utils/variables";

const SingleOrder = async ({ params }: { params: { id: string } }) => {
  // const isClient = typeof window !== "undefined";
  // const bearer = isClient ? localStorage.getItem("accessToken") : null;

  const orderId = params.id;

  // const bookData = await OrderInfo(orderId, bearer);

  // console.log("Bearer Order", bearer);

  // console.log("Single Order", bookData);

  return (
    <div>
      SingleOrder: {orderId}
      <div></div>
    </div>
  );
};

export default SingleOrder;
