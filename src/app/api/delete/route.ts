import { url } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {

    const bearer = request.headers.get('Authorization')

    const data = await request.json()

    const { orderId } = data;

    const res = await fetch(`${url}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${bearer}`
        },
        cache: "no-store"
    })

    const response = await res.json();

    return NextResponse.json(response)

}