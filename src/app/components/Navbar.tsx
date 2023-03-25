// components/Navbar.js
'use client'

// components/Navbar.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

const Navbar = () => {

    const [bookId, setBookId] = useState('');
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (bookId.trim()) {
            router.push(`/book/${bookId}`);
        }
    };



    return (
        <nav className="bg-gray-800 py-3">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-white text-2xl font-semibold">
                        My App
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-gray-300 hover:text-white">
                            All Books
                        </Link>
                        <Link href="/login" className="text-gray-300 hover:text-white">
                            Login
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-white">
                            Contact
                        </Link>
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={bookId}
                                onChange={(e) => setBookId(e.target.value)}
                                className="rounded bg-white text-black px-3 py-1 focus:outline-none"
                                placeholder="Enter Book ID"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            >
                                Go
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
