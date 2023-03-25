// Order Book

import { url, registedUserData } from "@/utils/variables";

import { clientToken } from "./token";

export async function orderBook({ id }: any) {

    const tokenID = await clientToken({ registedUserData });

    const orderData = {
        bookId: id,
        customerName: `${registedUserData.clientName}`,
    }


    const res = await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenID.accessToken}`,
        },
        body: JSON.stringify(orderData),
    })

    if (!res.ok) {
        throw new Error('Error in Order Placement')
    }
    return res.json()
}