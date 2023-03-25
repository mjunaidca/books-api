// app/auth-form.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

const fetcher = async ({
  url,
  name,
  email,
}: {
  url: string;
  name: string;
  email: string;
}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clientName: name, clientEmail: email }),
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  const data = await response.json();

  return data;
};

export default function AuthForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [callSWR, setCallSWR] = useState(false);

  const router = useRouter();

  const { data, error } = useSWR(
    callSWR ? { url: `/api/register`, name: name, email: email } : null,
    fetcher
  );

  if (data) {
    console.log(`Client Token:`, data.accessToken);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setCallSWR(true);
  };

  const goToLastPage = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register/Login</h2>
        {submitted && (
          <div className="bg-green-200 border-green-500 border p-2 mb-4 rounded-md text-center">
            <p className="text-green-700">Authetication Successfull!</p>
            <button
              onClick={goToLastPage}
              className="mt-2 px-4 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Order Your Book
            </button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={!name || !email}
            className={`w-full px-4 py-2 text-white rounded-md mx-auto bg-black font-semibold hover:bg-gray-900 focus:outline-double`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
