
import { url, requestedBook, orderName, registedUserData } from "@/utils/variables";

// welcome message
export async function getBooksMessage() {
    const res = await fetch(`${url}`);
    if (!res.ok) {
        throw new Error('')
    }
    return res.json();
}

// POST Register API Client
export async function clientToken({ registedUserData }: any) {
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