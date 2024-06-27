import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { PhotoIcon } from '@heroicons/react/24/solid'

export default function Aset() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        kategori:'',
        lokasi: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:3001/add_aset', formData);
            console.log(response);
            if (response.status === 200||201) {
                // Register berhasil
                navigate('/aset');
                alert('Submit form berhasil')
            } else {
                // Register gagal
                alert('Submit form gagal');
            }
        } catch (error) {
            // Terjadi kesalahan saat melakukan permintaan submit form tiket
            alert('Terjadi kesalahan saat submit form aset');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Form Aset</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Isi sesuai dengan aset yang akan ditambahkan.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                <label htmlFor="aset" className="block text-sm font-medium leading-6 text-gray-900">
                    Nama Aset
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="nama"
                        id="nama"
                        autoComplete="nama"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Nama Aset..."
                        required
                    />
                    </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="lokasi" className="block text-sm font-medium leading-6 text-gray-900">
                    Kategori
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select 
                        name="kategori" 
                        id="kategori" 
                        value={formData.kategori} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Wifi">Wifi</option>
                        <option value="Komputer">Komputer</option>
                        <option value="Website">Website</option>
                        <option value="Router">Router</option>
                        <option value="Switch">Switch</option>
                        <option value="Server">Server</option>
                    </select>
                    </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="lokasi" className="block text-sm font-medium leading-6 text-gray-900">
                    Lokasi
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select 
                        name="lokasi" 
                        id="lokasi" 
                        value={formData.lokasi} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Lokasi</option>
                        <option value="Gedung Rektorat">Gedung Rektorat</option>
                        <option value="Gedung Roak">Gedung Roak</option>
                        <option value="Gedung Roum">Gedung Roum</option>
                        <option value="Gedung Auditorium">Gedung Auditorium</option>
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
                    <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                    Change
                    </button>
                </div>
                </div> */}

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
                <p className="mt-3 text-sm leading-6 text-gray-600">Lampirkan foto aset yang akan ditambahkan (jika ada).</p>
                </div> */}
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