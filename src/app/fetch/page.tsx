
import { url, orderName, } from "@/utils/variables";



// get all Books
async function getBooksList() {
    const res = await fetch(`${url}/books`)
    if (!res.ok) {
        throw new Error('Error in getting all books')
    }
    return res.json();
}

// get single Book 
async function getBook() {
    const res = await fetch(`${url}/books/${requestedBook}`)
    if (!res.ok) {
        throw new Error('Error in getting data about the book')
    }
    return res.json();
}

// POST Register API Client
async function clientToken({ registedUserData }: any) {
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

// Order Book
async function orderBook() {
    const bearer = await clientToken({ registedUserData });
    const singleBook = await getBook();

    const orderData = {
        bookId: `${singleBook.id}`,
        customerName: `${registedUserData.clientName}`,
    }


    const res = await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer.accessToken}`,
        },
        body: JSON.stringify(orderData),


    })

    if (!res.ok) {
        throw new Error('Error in Order Placement')
    }

    return res.json()
}

//Get all Orders
async function allOrders() {
    const bearer = await clientToken({ registedUserData });

    const res = await fetch(`${url}/orders`, {
        method: 'GET', // Specify the method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer.accessToken}`,
        },

    })

    if (!res.ok) {
        throw new Error('Error in getting order')
    }
    return res.json();

}

// update Order Name Not WOrking
async function updateOrder() {
    const bearer = await clientToken({ registedUserData });
    const orderToken = await orderBook();

    // const orderName = {
    //   customerName: 'Junaid',
    // };

    const res = await fetch(`https://simple-books-api.glitch.me/orders/${orderToken.orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer.accessToken}`,
        },
        body: JSON.stringify(orderName),

    })
    console.log('sent request');
    if (!res.ok) {
        throw new Error('Error in Name Change Placement')
    }
    console.log('change name');
    return null;
}

//single order all Orders
async function singleOrder() {
    const bearer = await clientToken({ registedUserData });
    const orderToken = await orderBook();


    const res = await fetch(`${url}/orders/${orderToken.orderId}`, {
        method: 'GET', // Specify the method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer.accessToken}`,
        },
        cache: 'no-store', // Add this option
    })

    if (!res.ok) {
        throw new Error('Error in getting update order details')
    }
    return res.json();

}

// I think it will start working as we build the applications
async function deleteOrder() {
    const bearer = await clientToken({ registedUserData });
    const orderId = await orderBook(); // Replace this with your orderId

    const res = await fetch(`${url}/orders/${orderId.orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer.accessToken}`,
        },
        body: JSON.stringify(orderName),
    })

    console.log('requested for deletion ');
    if (!res.ok) {
        throw new Error('Error in deleting order')
    }
    console.log('deleted ');
    return res.json();

}

export default async function Home() {
    const data = await getBooksMessage();
    const allBooks = await getBooksList();
    const singleBook = await getBook();
    const orderToken = await orderBook();
    const orderedBooks = await allOrders();
    const updateName = await updateOrder();
    const newOrderName = await singleOrder();
    // const delOrderName = await deleteOrder();

    // console.log(orderedBooks);
    // console.log(delOrderName);

    return (
        <div className='min-h-screen bg-black text-white px-14 py-10 justify-between items-center' >
            {/* Welcome Message */}
            <div className='text-4xl '>
                {data.message}
            </div>

            {/* All Books */}
            <div className=' py-12 flex flex-grow flex-wrap gap-4'> {/* use grid layout with 3 columns and 1rem gap */}
                {allBooks.map((item: any) => (
                    <div key={item.id} className='justify-between basis-1/4  w-full flex-wrap bg-gray-900 flex flex-col p-4 m-4 ' >
                        <div className='flex space-x-5 p-2 rounded-2xl bg-blue-900'>
                            <div>{item.id}</div>
                            <div>{item.name}</div>
                        </div>
                        <div>{item.type}</div>
                    </div>
                ))}
            </div>

            {/* Single Book */}
            <div className='text-lg flex flex-col font-bold px-8 bg-gray-700' >
                <div>{singleBook.id}</div>
                <div>{singleBook.name}</div>
                <div>{singleBook.type}</div>
                <div>{singleBook.avalible}</div>
                <div>{singleBook.author}</div>
                <div>{singleBook.price}</div>
                <div>{singleBook[`current-stock`]}</div>
            </div>

            {/* Ordered Book ID */}
            <div className='text-xl my-10 py-10 bg-green-900 '>
                <h1>Successfuly Order created</h1>
                {orderToken.orderId}
            </div>


            {/* All Ordered Books */}
            <div className=' py-12 flex flex-grow flex-wrap gap-4'> {/* use grid layout with 3 columns and 1rem gap */}
                {orderedBooks.map((item: any) => (
                    <div key={item.id} className='justify-between basis-1/4  w-full flex-wrap bg-gray-900 flex flex-col p-4 m-4 ' >
                        <div className='flex space-x-5 p-2 rounded-2xl bg-blue-900'>
                            <div>{item.bookId}</div>
                            <div>{item.customerName}</div>
                        </div>
                        <div>{item.quantity}</div>
                    </div>
                ))}
            </div>

            {/* Single Order */}
            <div className=' py-12 flex flex-grow flex-wrap gap-4'> {/* use grid layout with 3 columns and 1rem gap */}
                <div className='justify-between basis-1/4  w-full flex-wrap bg-gray-900 flex flex-col p-4 m-4 ' >
                    <div className='flex space-x-5 p-2 rounded-2xl bg-blue-900'>
                        <div>{newOrderName.bookId}</div>
                        <div>{newOrderName.customerName}</div>
                    </div>
                    <div>{newOrderName.quantity}</div>
                </div>
            </div>


        </div>
    )
}
