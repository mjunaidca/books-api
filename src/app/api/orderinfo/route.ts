import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function OrderInfo(orderId: any, bearer: any) {

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
        },
        // cache: "no-store"
        // Add this option
    });

    if (!res.ok) {
        throw new Error("Error in getting update order details");
    }

    const response = await res.json();

    return response

}