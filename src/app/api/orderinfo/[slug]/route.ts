import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {

    const orderId = params.slug;

    const bearer = request.headers.get('Authorization')

    console.log('Bearer in Slug', bearer);


    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${bearer}`,
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