import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';

export default function Layout() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [userRole, setUserRole] = useState(null); // Menambah state untuk peran pengguna

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        if (!token || token === '' || !id || id === '') {
            alert('Please log in first');
            navigate('/login');
        } else {
            const verify = async () => {
                try {
                    const response = await axios.post('http://localhost:3001/verify', null, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setIsLogin(true);
                        setUserRole(localStorage.getItem('peran')); // Setel peran pengguna dari localStorage
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Error while verifying token:', error);
                    navigate('/login');
                }
            };

            verify();
        }
    }, [navigate]);

    if (isLogin && userRole) {
        return (
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
                <Sidebar userRole={userRole} /> {/* Mengirimkan peran pengguna ke Sidebar */}
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 min-h-0 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    } else {
        return null; // Atau Anda bisa merender komponen Login di sini
    }
}
