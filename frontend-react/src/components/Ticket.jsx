import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { parseISO, format, set } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export default function TicketList() {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);  // State untuk menyimpan ID tiket yang dipilih untuk dihapus
    const navigate = useNavigate();
    const [tiket, setTiket] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/show_tiket')
            .then(response => {
                setTiket(response.data);
            })
            .catch(error => {
                console.error('Error fetching tiket:', error);
            });
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:3001/search_tiket', { search: searchTerm });
            setTiket(response.data);
        } catch (error) {
            console.error('Error searching tiket:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/remove_tiket/${id}`);
            console.log(response);
            if (response.status === 200) {
                const updatedTiket = tiket.filter(item => item.id !== id);
                setTiket(updatedTiket);
                alert('Hapus tiket berhasil');
            } else {
                alert('Hapus tiket gagal');
            }
        } catch (error) {
            alert('Terjadi kesalahan saat menghapus tiket');
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between mb-4">
                <Link to="/form-ticket">
                    <button className="bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded">
                        Buat Tiket
                    </button>
                </Link>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Cari tiket..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded"
                    >
                        <FaSearch className="text-xl" />
                    </button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">Judul</th>
                        <th scope="col" className="px-6 py-3">Pelapor</th>
                        <th scope="col" className="px-6 py-3">Aset</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Deskripsi Laporan</th>
                        <th scope="col" className="px-6 py-3">Prioritas</th>
                        <th scope="col" className="px-6 py-3">Created at</th>
                        <th scope="col" className="px-6 py-3">Edited at</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    {tiket.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.judul}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.users_username}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.aset_nama}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.status_nama}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.deskripsi}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.prioritas_nama || 'Belum Ditentukan'}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.edited_at ? format(parseISO(item.edited_at), "dd MMMM yyyy, HH:mm") : 'Belum diedit'}</td>
                            <td>
                                <button
                                    className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                                    onClick={() => navigate(`/edit-ticket/${item.id}`)}
                                >
                                    <FaRegEdit className="text-xl" />
                                </button>
                                <button
                                    className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                                    onClick={() => {
                                        setSelectedTicketId(item.id);  // Set ID tiket yang dipilih untuk dihapus
                                        setShowModalDelete(true)
                                    }}
                                >
                                    <MdDeleteOutline className="text-xl" />
                                </button>
                                {showModalDelete && (
                                    <div
                                        id="popup-modal"
                                        tabIndex="-1"
                                        className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-100 bg-opacity-40"
                                        onClick={() => setShowModalDelete(false)}
                                    >
                                        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                                            <div className="p-4 md:p-5 text-center">
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                    Apakah anda yakin ingin menghapus tiket ini?
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowModalDelete(false);
                                                        handleDelete(selectedTicketId);  // Hapus tiket dengan ID yang dipilih
                                                    }}
                                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                                >
                                                    Ya, Saya yakin
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowModalDelete(false)}
                                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                >
                                                    Tidak, Batalkan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
