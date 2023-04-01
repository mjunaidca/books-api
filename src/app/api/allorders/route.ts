import { NextResponse } from "next/server"
import { API_URL } from "@/utils/variables"

export async function GET(request: Request) {

    const bearer = request.headers.get('Authorization')

    console.log("Token in API endpoint:", bearer);


    const res = await fetch(`${API_URL}/orders`, {
        // method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer 33a6d9e46740c0d4473ba4d396d4c194b71e8a8728deee733ec5472f7d862127`
            Authorization: `${bearer}`
        },
        cache: "no-store"
    })

    const data = await res.json()
    console.log('API Bearer', bearer);

    return NextResponse.json(data)

}

