'use client'


  const isClient = typeof window !== "undefined";
export const bearer = isClient ? localStorage.getItem("accessToken") : null;



export const url: string = `https://simple-books-api.glitch.me`;

interface newName {
  customerName: string;
}

// new User Name
export let orderName: newName = {
  customerName: "Junaid",
};
