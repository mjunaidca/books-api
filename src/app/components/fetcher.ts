
const fetcher = async (url: string, name: string, email: string) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "clientName": name, "clientEmail": email }),
    });

    if (!response.ok) {
        throw new Error('An error occurred while fetching the data');
    }

    const data = await response.json();

    return data;
};

export default fetcher;
