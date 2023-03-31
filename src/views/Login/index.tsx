// app/auth-form.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

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
  //   const [submitted, setSubmitted] = useState(false);
  const [callSWR, setCallSWR] = useState(false);

  const router = useRouter();

  const { data, error } = useSWR(
    callSWR ? { url: `/api/register`, name: name, email: email } : null,
    fetcher
  );

  if (data) {
    console.log(`Client Token:`, data.accessToken);

    window.localStorage.setItem(`accessToken`, data.accessToken);

    window.localStorage.setItem(`name`, name);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSubmitted(true);
    setCallSWR(true);
    router.refresh();
  };

  const goToLastPage = () => {
    router.push(`./new-order`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="userForm bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register/Login</h2>
        {callSWR && (
          <div className="SuccessText mb-6">
            <p className="text-green-700 font-semibold">
              Your Authentication Key:
            </p>
            <p className="mb-2">{data ? data.accessToken : `Loading...`}</p>
            <button
              onClick={goToLastPage}
              className="SuccessButton px-4 py-2 bg-blue-500 text-white font-semibold rounded"
            >
              Order Your Book
            </button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={!name || !email}
            className="SubmitButton w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
