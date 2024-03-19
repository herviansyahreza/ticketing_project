import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LogoDefenceDesk from './DefenceTicketingLogo.png'

export default function Login() {
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: data.get('email'),
                password: data.get('password')
            });

            console.log(response);

            if (response.status === 200) {
                // Login berhasil
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('id_user', response.data.id_user);
                navigate('/');
            } else {
                // Login gagal karena username atau password salah
                alert('Email atau password salah');
            }
        } catch (error) {
            // Terjadi kesalahan saat melakukan permintaan login
            alert('Terjadi kesalahan saat login');
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
                Sign in to your account
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
                    Sign in
                    </button>
                </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500 py-8">
                Don't have an account? 
                <a onClick={handleClickRegister} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 cursor-pointer">
                    Register
                </a>
                </p>
            </div>
            </div>
        </div>
        </div>
        )
    }
