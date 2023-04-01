import { NextResponse } from "next/server"
import { API_URL } from "@/utils/variables"

export async function GET(request: Request) {

    const bearer = request.headers.get('Authorization')

    console.log("Token in API endpoint:", bearer);


    const res = await fetch(`${API_URL}/orders`, {
        // method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `${bearer}`
        },
        cache: "no-store"
    })

    const data = await res.json()
    console.log('API Bearer', bearer);

    return NextResponse.json(data)

}

