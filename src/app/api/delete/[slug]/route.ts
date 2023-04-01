import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {

    const orderId = params.slug;

    console.log('Del ID', orderId);


    const bearer = request.headers.get('Authorization')

    console.log('DEL BEARER', bearer);


    console.log('Bearer in DEL', bearer);

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${bearer}`,
        },
        // cache: "no-store"
        // Add this option
    });

    if (!res.ok) {
        throw new Error("Error in deleting order");
    }

    console.log( 'STATUS', res.status);


    const response = await res.json();
    console.error("Error in server-side DELETE function:");


    return NextResponse.json(response)

}