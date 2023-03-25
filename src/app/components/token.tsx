
import { url } from "@/utils/variables";

interface userData {
    clientName: string,
    clientEmail: string,
}

// POST Register API Client

export async function clientToken({ registedUserData }: { registedUserData: userData }) {

    const res = await fetch(`${url}/api-clients`, {
        method: 'POST', // Specify the method
        headers: {
            // Specify the content type
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registedUserData), // Send the data as JSON
    })
    return res.json();
}

