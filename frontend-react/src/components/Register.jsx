import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoDefenceDesk from './DefenceTicketingLogo.png'

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        peran: 'Pengguna',
        password: '',
        confirmPassword: '',
        nim: '',
        prodi: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = 'Nama lengkap wajib diisi';
        if (!formData.email) formErrors.email = 'Email wajib diisi';
        if (!formData.password) formErrors.password = 'Password wajib diisi';
        if (formData.password.length < 8) formErrors.password = 'Password minimal 8 karakter';
        if (!/[A-Z]/.test(formData.password)) formErrors.password = 'Password harus memiliki satu huruf kapital';
        if (!/\d/.test(formData.password)) formErrors.password = 'Password harus memiliki satu angka';
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Password dan konfirmasi password tidak cocok';
        if (!formData.nim) formErrors.nim = 'NIM wajib diisi';
        if (!/^\d+$/.test(formData.nim)) formErrors.nim = 'NIM harus berupa angka';
        return formErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/register', formData);
            if (response.status === 200) {
                alert('Registrasi berhasil! Silakan tunggu persetujuan dari admin.');
                navigate('/login');
            } else {
                alert('Registrasi gagal');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({ ...errors, email: error.response.data });
            } else {
                alert('Terjadi kesalahan saat melakukan registrasi');
            }
        }
    };

    const handleClickLogin = () => {
        navigate('/login');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center my-6 mb-6 text-2xl font-semibold text-gray-900 dark:text-white uppercase">
                    <img className="mx-4 h-20 w-auto" src={LogoDefenceDesk} alt="LogoDefenceDesk" />
                    DefenceDesk Ticketing Unhan RI
                </p>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Buat Akun
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Full Name"
                                    required
                                />
                                {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Anda</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="nim" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIM/NRP/NIP</label>
                                <input
                                    type="text"
                                    name="nim"
                                    id="nim"
                                    value={formData.nim}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="NIM/NRP/NIP"
                                    required
                                />
                                {errors.nim && <p className="text-red-600 text-sm mt-1">{errors.nim}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="prodi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prodi/Unit Kerja</label>
                                <input
                                    type="text"
                                    name="prodi"
                                    id="prodi"
                                    value={formData.prodi}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Prodi/Unit Kerja"
                                    required
                                />
                                {/* {errors.prodi && <p className="text-red-600 text-sm mt-1">{errors.prodi}</p>} */}
                            </div>
                        </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 cursor-pointer"
                            >
                                Buat Akun
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Sudah Punya Akun?{' '}
                                <a
                                    onClick={handleClickLogin}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                                >
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
