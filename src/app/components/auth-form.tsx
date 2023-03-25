// app/auth-form.tsx
'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { url } from '@/utils/variables';

export default function AuthForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const isMutating = submitted || isPending;

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setSubmitted(true);

        await fetch(`${url}/api-clients`, {
            method: 'PUT',
            body: JSON.stringify({ clientName: name, clientEmail: email }),
        });
        setSubmitted(false);

        startTransition(() => {
            router.refresh();
        });

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
