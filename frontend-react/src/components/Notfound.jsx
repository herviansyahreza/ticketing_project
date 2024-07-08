import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
    useEffect(() => {
        const role = localStorage.getItem('peran');
        switch (role) {
            case '1':
                // Redirect to / if role is 1 (admin)
                window.location.href = '/';
                break;
            case '2':
                // Redirect to /dashboard if role is 2 (technician)
                window.location.href = '/';
                break;
            case '3':
                // Redirect to /tiket_byUser if role is 3 (regular user)
                window.location.href = '/tiket_byUser';
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
            <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
            <div className="animate-bounce">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </div>
            {/* <p className="mt-4 text-gray-600">Let's get you back <Link to="/" className="text-blue-500">home</Link>.</p> */}
        </div>
    );
}

