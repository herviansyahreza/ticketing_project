import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
// import { PhotoIcon } from '@heroicons/react/24/solid'

export default function TicketForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: '',
        aset: '',
        deskripsi: '',
        status: '',
        prioritas: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const username = localStorage.getItem('name');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            judul: formData.judul,
            aset: formData.aset,
            deskripsi: formData.deskripsi,
            user: username,
            status: formData.status,
            prioritas: formData.prioritas,
        };

        try {
            const response = await axios.post('http://localhost:3001/add_tiket', data);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                // Register berhasil
                navigate('/ticket');
                alert('Submit form berhasil');
            } else {
                // Register gagal
                alert('Submit form gagal');
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Form Ticket</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Isi sesuai dengan keluhan tiket anda.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                <label htmlFor="judul" className="block text-sm font-medium leading-6 text-gray-900">
                    Judul Tiket
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="judul"
                        id="judul"
                        autoComplete="judul"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-2 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=""
                        required
                    />
                    </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="aset" className="block text-sm font-medium leading-6 text-gray-900">
                    Aset
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select 
                        name="aset" 
                        id="aset" 
                        value={formData.aset} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Aset</option>
                        <option value="Wifi Kemhan go.id">Wifi Kemhan go.id</option>
                        <option value="Wifi Kadet Mahasiswa">Wifi Kadet Mahasiswa</option>
                        <option value="Wifi Unhan Mahasiswa">Wifi Unhan Mahasiswa</option>
                        <option value="Wifi Unhan 1st-Class">Wifi Unhan 1st-Class</option>
                        <option value="Wifi Unhan 2nd-Class">Wifi Unhan 2nd-Class</option>
                        <option value="Wifi Unhan 3rd-Class">Wifi Unhan 3rd-Class</option>
                        <option value="Wifi Unhan 4th-Class">Wifi Unhan 4th-Class</option>
                        <option value="Wifi Unhan 5th-Class">Wifi Unhan 5th-Class</option>
                        <option value="Wifi Unhan 6th-Class">Wifi Unhan 6th-Class</option>
                        <option value="Wifi Unhan 7th-Class">Wifi Unhan 7th-Class</option>
                        <option value="Wifi Unhan 8th-Class">Wifi Unhan 8th-Class</option>
                        <option value="Wifi Unhan 9th-Class">Wifi Unhan 9th-Class</option>
                        <option value="Wifi Unhan 10th-Class">Wifi Unhan 10th-Class</option>
                        <option value="Wifi Unhan 11th-Class">Wifi Unhan 11th-Class</option>
                    </select>
                    </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Status
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select 
                        name="status" 
                        id="status" 
                        value={formData.status}
                        defaultValue="Open" 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                        <option value="Reopened">Reopened</option>
                    </select>
                </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="prioritas" className="block text-sm font-medium leading-6 text-gray-900">
                    Prioritas
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select 
                        name="prioritas" 
                        id="prioritas" 
                        value={formData.prioritas} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Prioritas</option>
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    </div>
                </div>
                </div>
                
                <div className="col-span-full">
                <label htmlFor="deskripsi" className="block text-sm font-medium leading-6 text-gray-900">
                    Deskripsi Laporan
                </label>
                <div className="mt-2">
                    <textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows={5}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    required
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Tulis laporan dengan lengkap.</p>
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