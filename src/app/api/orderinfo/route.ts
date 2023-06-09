import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const bearer = request.headers.get('Authorization')

    console.log("Token in API endpoint:", bearer);

    const data = await request.json()

    const { orderId } = data

    console.log(orderId)

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

    return NextResponse.json(response)

}