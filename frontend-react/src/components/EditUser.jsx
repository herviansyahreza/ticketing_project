import React, { useState, useEffect } from 'react'
// import { UserCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'



export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL menggunakan useParams()
    const [formData, setFormData] = useState({
        id: '', // Menyimpan ID user
        username: '',
        email: '',
        password: '',
        peran: '',
    });

    useEffect(() => {
        // Mengambil data user yang akan diubah berdasarkan ID
        axios.get(`http://localhost:3001/get_user/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('Terjadi kesalahan saat mengambil data user');
            });
    }, [id]); // Menggunakan id sebagai dependensi untuk efek useEffect()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            id: id,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            peran: formData.peran,
        };

        try {
            const response = await axios.put(`http://localhost:3001/update/${id}`, newData);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                // Edit berhasil
                navigate('/users');
                alert('Edit form berhasil');
            } else {
                // Edit gagal
                alert('Edit form gagal');
            }
        } catch (error) {
            // Menangani kesalahan dengan lebih rinci
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('Submit form gagal: ' + error.response.data.message);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Terjadi kesalahan saat mengirimkan permintaan');
            } else {
                console.error('Error:', error.message);
                alert('Terjadi kesalahan: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Form Users</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Isi sesuai dengan user yang akan ditambahkan.
                </p>
    
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
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
                            placeholder=""
                            required
                        />
                        </div>
                    </div>
                    </div>
    
                    <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
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
                            placeholder=""
                            required
                        />
                        </div>
                    </div>
                    </div>
    
                    {/* <div className="sm:col-span-4">
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
                        />
                        </div>
                    </div>
                    </div> */}
    
                    <div className="sm:col-span-4">
                    <label htmlFor="peran" className="block text-sm font-medium leading-6 text-gray-900">
                        Peran
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
                    
                    {/* <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Deskripsi Laporan
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="laporan"
                        name="laporan"
                        rows={5}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        required
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">Tulis laporan dengan lengkap.</p>
                    </div> */}
    
                    {/* <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-neutral-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-600 focus-within:ring-offset-2 hover:text-neutral-500"
                            >
                            <span>Change Photo</span>
                            <input id="change-photo" name="fchange-photo" type="file" className="sr-only" />
                            </label>
                    </div>
                    </div> */}
                </div>
    
                    {/* <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Lampiran Foto
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">Lampirkan foto pada pc atau aset yang bermasalah (jika ada).</p>
                    </div>
                </div> */}
    
                <div className="flex justify-end items-center">
                    <button
                    type="submit"
                    className="flex justify-center items-center m-8 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 cursor-pointer"
                    >
                    Submit Edit Form
                    </button>
                    </div>
                </div>
            </div>
        </form>
        );
}
