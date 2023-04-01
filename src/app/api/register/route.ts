import { API_URL } from "@/utils/variables";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const data = await request.json();

    const { clientName, clientEmail } = data;

    console.log("Email", clientEmail);
    console.log("Name", clientName);

    const response = await fetch(`${API_URL}/api-clients/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientName,
            clientEmail,
        }),
    });


    const resData = await response.json();
    console.log(`Res DATA:`, resData);


    return NextResponse.json(resData)

}
