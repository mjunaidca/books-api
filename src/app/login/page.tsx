"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Loader } from "@/components/Loader";

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

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    if (data.accessToken !== undefined) {
      setTimeout(() => {
        Redirect();
      }, 2000);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallSWR(true);
    // router.refresh();
  };

  function Redirect() {
    router.push("/new-order");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="userForm bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-8"
      >
        <div className="text-2xl font-bold mb-6 text-center">
          Register/Login
        </div>
        {callSWR && (
          <div className="flex flex-col justify-center mb-6">
            <p className="text-green-600 font-semibold">Registration Status:</p>
            {data ? (
              `${(data.accessToken && "success") || `${data.error} `}`
            ) : (
              <Loader />
            )}
          </div>
        )}
        <InputWithLabel
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputWithLabel
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
