
interface userData {
    clientName: string,
    clientEmail: string,
}

interface newName {
    customerName: string
}

export const url: string = `https://simple-books-api.glitch.me`;

export let requestedBook: number = 1;

// register api client details
export let registedUserData: userData = {
    clientName: 'mjs',
    clientEmail: 'mjs@mjs.com',
}

// new User Name

export let orderName: newName = {
    customerName: 'Junaid',
};