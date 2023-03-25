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
  };

  const goToLastPage = () => {
    router.push(`./new-order`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={handleSubmit} className="userForm">
        <h2>Register/Login</h2>
        {callSWR && (
          <div className="SuccessText">
            <p className="text-green-700">Your Authetication Key:</p>
            <p>{data ? data.accessToken : `Loading...`}</p>
            <button onClick={goToLastPage} className="SuccessButton">
              Order Your Book
            </button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={!name || !email}
            className="SubmitButton"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
