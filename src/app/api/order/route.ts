import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const data = await request.json();

    const token = request.headers.get("Authorization");
    console.log("Token in API endpoint:", token);


    const { clientName, bookId, } = data;

    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify({
            bookId,
            clientName
        })
    })

    const resOrder = await response.json();
    console.log(`Order Data`, resOrder);

    return NextResponse.json(resOrder)
}
