import React, { useState, useEffect } from 'react';

export default function Profile() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        peran_nama: ''
    });

    useEffect(() => {
        // Ambil data user dari localStorage
        const username = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const peran = localStorage.getItem('peran');
        
        // Set state user dengan data yang diambil dari localStorage
        setUser({
            username: username || '',
            email: email || '',
            peran: peran || ''
        });
    }, []);

    const getPeranName = (peran) => {
        switch (peran) {
            case '1':
                return 'Pengguna';
            case '2':
                return 'Teknisi';
            case '3':
                return 'Admin';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="mx-auto bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg p-4">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Informasi User
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and information about user.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Username
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.username}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Peran
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {getPeranName(user.peran)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
