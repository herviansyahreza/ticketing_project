import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Layout() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [userRole, setUserRole] = useState(null); // Menambah state untuk peran pengguna

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token || token === '') {
            alert('Please log in first');
            navigate('/login'); // Ganti dengan routing yang sesuai dengan framework atau library Anda
        } else {
            const verifyToken = async () => {
                try {
                    // Dekode token sebelum verifikasi
                    const decodedToken = jwtDecode(token);

                    const response = await axios.post('http://localhost:5001/verify', null, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        // Verifikasi berhasil
                        setIsLogin(true);
                        
                        // Ambil informasi pengguna dari decodedToken
                        const userRole = decodedToken.peran; // Sesuaikan dengan nama properti yang ada di dalam token

                        setUserRole(userRole);

                        // Lakukan apa pun yang perlu Anda lakukan setelah verifikasi sukses

                    } else {
                        // Verifikasi gagal, arahkan pengguna kembali ke halaman login
                        navigate('/login'); // Ganti dengan routing yang sesuai dengan framework atau library Anda
                    }
                } catch (error) {
                    console.error('Error while verifying token:', error);
                    navigate('/login'); // Ganti dengan routing yang sesuai dengan framework atau library Anda
                }
            };

            verifyToken();
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
