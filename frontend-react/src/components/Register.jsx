import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoDefenceDesk from './DefenceTicketingLogo.png'

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        peran: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:3001/register', formData);
            console.log(response);
            if (response.status === 200) {
                // Register berhasil
                alert('Register akun berhasil');
                navigate('/login');
            } else {
                // Register gagal
                alert('Register gagal');
            }
        } catch (error) {
            // Terjadi kesalahan saat melakukan permintaan register
            alert('Terjadi kesalahan saat register');
        }
    };

    const handleClickLogin = () => {
        // Navigate ke halaman login
        navigate('/login');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className=" bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center my-6 mb-6 text-2xl font-semibold text-gray-900 dark:text-white uppercase">
                <img
                className="mx-4 h-20 w-auto"
                src={LogoDefenceDesk}
                alt="LogoDefenceDesk"
                />
                    DefenceDesk Ticketing Unhan RI
                </p>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="peran" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peran</label>
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
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 cursor-pointer">Create an account</button>
                            
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a onClick={handleClickLogin} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}