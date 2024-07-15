import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export default function UserForm() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.peran;
                if (role !== 1) { 
                    alert('Hanya admin yang bisa mengakses halaman ini.');
                    navigate('/unauthorized');
                    return;
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/login');
                return;
            }
        } else {
            navigate('/login');
            return;
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        peran: '',
        nim: '',
        prodi: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const nimRegex = /^\d+$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Format email tidak valid.';
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password tidak valid. Harus setidaknya 8 karakter panjangnya, mengandung setidaknya satu huruf dan satu angka.';
        }

        if (!nimRegex.test(formData.nim)) {
            newErrors.nim = 'NIM tidak valid. Harus berupa angka.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:5001/add_user', formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/users');
                alert('Submit form berhasil');
            } else {
                alert('Submit form gagal');
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat submit form:', error);
            alert('Terjadi kesalahan saat submit form tiket');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Formulir Pengguna Baru</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Isi sesuai dengan user yang akan ditambahkan.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Nama Lengkap
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="username..."
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Alamat Email
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="email..."
                                        required
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="prodi" className="block text-sm font-medium leading-6 text-gray-900">
                                Program Studi / Unit Kerja
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="prodi"
                                        id="prodi"
                                        autoComplete="prodi"
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Prodi / Unit Kerja..."
                                        required
                                    />
                                </div>
                                {/* {errors.prodi && <p className="mt-2 text-sm text-red-600">{errors.prodi}</p>} */}
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="nim" className="block text-sm font-medium leading-6 text-gray-900">
                                NIM/NRP/NIP
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="nim"
                                        id="nim"
                                        autoComplete="nim"
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="NIM/NRP/NIP..."
                                        required
                                    />
                                </div>
                                {errors.nim && <p className="mt-2 text-sm text-red-600">{errors.nim}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        onChange={handleChange}
                                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="peran" className="block text-sm font-medium leading-6 text-gray-900">
                                Peran Pengguna
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <select 
                                        name="peran" 
                                        id="peran" 
                                        value={formData.peran} 
                                        onChange={handleChange} 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Peran</option>
                                        <option value="Administrator">Admin</option>
                                        <option value="Teknisi">Teknisi</option>
                                        <option value="Pengguna">Pengguna</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end items-center">
                        <button
                            type="submit"
                            className="flex justify-center items-center m-8 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 cursor-pointer"
                        >
                            Submit Form
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
