import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LogoDefenceDesk from './DefenceTicketingLogo.png'

export default function Login() {
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const email = data.get('email');
        const password = data.get('password');
    
        // Validasi email dengan regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid');
            return;
        }
    
        // Validasi password dengan regex: minimal 8 karakter, mengandung satu huruf kapital dan satu angka
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password harus memiliki minimal 8 karakter, satu huruf kapital, dan satu angka');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5001/login', {
                email: email,
                password: password
            });
    
            if (response.status === 200) {
                // Login berhasil
                const accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
    
                // Navigasi berdasarkan peran pengguna
                const role = response.data.peran; // Ubah sesuai dengan nama yang tepat dari backend Anda
                if (role === 1) {
                    // Admin
                    navigate('/'); // Halaman untuk admin
                } else if (role === 2) {
                    // Teknisi
                    navigate('/'); // Halaman untuk teknisi
                } else if (role === 3) {
                    // Pengguna
                    navigate('/tiket_byUser'); // Halaman utama untuk pengguna
                }
            } else {
                // Login gagal karena username atau password salah
                alert('Email atau password salah');
            }
        } catch (error) {
            if (error.response) {
                // Respons dari server diterima tetapi ada masalah
                if (error.response.status === 403) {
                    alert('Akun Anda belum disetujui oleh admin. Silakan coba lagi nanti.');
                } else if (error.response.status === 400) {
                    alert('Email atau password salah.');
                } else {
                    alert('Terjadi kesalahan saat login: ' + error.response.data.message);
                }
            } else if (error.request) {
                // Permintaan dibuat tetapi tidak ada respons
                console.error('Error request:', error.request);
                alert('Tidak ada respons dari server. Silakan coba lagi nanti.');
            } else {
                // Terjadi kesalahan saat mengatur permintaan
                console.error('Error:', error.message);
                alert('Terjadi kesalahan saat mengatur permintaan: ' + error.message);
            }
        }
    };
    

    const handleClickRegister = () => {
        // Navigate ke halaman register
        navigate('/register');
    };

    return (
        <div className='bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm py-8">
                <img
                className="mx-auto h-40 w-auto"
                src={LogoDefenceDesk}
                alt="LogoDefenceDesk"
                />
            {/* <div className='flex justify-between items-center m-2'>
            <p className='text-xl font-bold'>Welcome to DefenceDesk Ticketing Universitas Pertahanan RI</p>
            </div> */}

            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mx-auto my-auto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Masuk ke akun Anda
                </h2>
                <form  onSubmit={handleSubmitLogin} className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
    
                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    {/* <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                        Forgot password?
                        </a>
                    </div> */}
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
    
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                    Masuk
                    </button>
                </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500 py-8">
                Anda belum punya akun? 
                <a onClick={handleClickRegister} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 cursor-pointer">
                    Daftar
                </a>
                </p>
            </div>
            </div>
        </div>
        </div>
        )
    }
