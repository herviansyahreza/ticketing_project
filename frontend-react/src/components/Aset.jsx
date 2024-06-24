import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function AsetList() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const [aset, setAset] = useState([]);
    const [selectedAsetId, setSelectedAsetId] = useState(null);  // State untuk menyimpan ID aset yang dipilih untuk dihapus

        useEffect(() => {
        axios.get('http://localhost:3001/show_aset')
            .then(response => {
            setAset(response.data);
            })
            .catch(error => {
            console.error('Error fetching aset:', error);
            });
        }, []);

        const handleDelete = async (id) => {
            try {
                const response = await axios.delete(`http://localhost:3001/remove_aset/${id}`);
                console.log(response);
                if (response.status === 200) {
                    // Hapus tiket berhasil
                    // Lakukan refresh data tiket
                    const updatedAset = aset.filter(item => item.id !== id);
                    setAset(updatedAset);
                    alert('Hapus aset berhasil');
                } else {
                    // Hapus tiket gagal
                    alert('Hapus aset gagal');
                }
            } catch (error) {
                // Terjadi kesalahan saat melakukan permintaan hapus tiket
                alert('Terjadi kesalahan saat menghapus aset');
            }
        };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Link to="/form-aset">
            <button className="bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-aset')}>
                Buat Aset
            </button>
        </Link>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Nama Aset</th>
                <th scope="col" className="px-6 py-3">Kategori</th>
                <th scope="col" className="px-6 py-3">Lokasi</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
            </thead>
            <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {aset.map((item, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.nama}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.kategori_nama}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.lokasi_nama}</td>
                    <td>
                        
                    <button 
                    className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                    onClick={ () => navigate(`/edit-aset/${item.id}`) }>
                    <FaRegEdit className="text-xl"/>
                    </button>

                    <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                    onClick={() => {
                        setSelectedAsetId(item.id);  // Set ID aset yang dipilih untuk dihapus
                        setShowModal(true)}}>
                    <MdDeleteOutline className="text-xl" />
                    </button>
                {showModal && (
                <div
                    id="popup-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-100 bg-opacity-50"
                    onClick={() => setShowModal(false)}
                >
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Apakah anda yakin ingin menghapus aset ini?
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    handleDelete(selectedAsetId);  // Hapus aset dengan ID yang dipilih
                                    // handleDelete(item.id);
                                }}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Ya, Saya yakin
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
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
    )
}
