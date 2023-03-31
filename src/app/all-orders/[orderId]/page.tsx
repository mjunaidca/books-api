import { url } from "@/utils/variables";
import { OrderInfo } from "@/app/api/orderinfo/route";

const SingleOrder = async ({ params }: { params: { orderId: string } }) => {
  const isClient = typeof window !== "undefined";

  //   const bearer = isClient ? localStorage.getItem("accessToken") : null;
  const bearer =
    "74c4b5db78a5a88b5b8f83c6b0f4e10daaceab1762694e2e796c6d03e82d4bc2";
  const id = params.orderId;

  const bookData = await OrderInfo(bearer, id);

  console.log(bookData);

  return (
    <div>
      SingleOrder: {id}
      <div></div>
    </div>
  );
};

export default SingleOrder;
