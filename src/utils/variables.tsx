
export const url: string = `https://simple-books-api.glitch.me`;
interface userData {
    clientName: string,
    clientEmail: string,
}

interface newName {
    customerName: string
}

// register api client details
export let registedUserData: userData = {
    clientName: 'junaid',
    clientEmail: 'junaid@mjs.com',
}

export let requestedBook: number = 1;

// new User Name
export let orderName: newName = {
    customerName: 'Junaid',
};