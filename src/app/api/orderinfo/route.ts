import { url } from "@/utils/variables";

export async function OrderInfo(orderId: string, bearer: string) {
    const res = await fetch(`${url}/orders/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store"
        // Add this option
    });

    if (!res.ok) {
        throw new Error("Error in getting update order details");
    }

    return res.json();
}