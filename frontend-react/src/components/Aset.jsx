import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function AsetList() {
    const navigate = useNavigate()
    const [aset, setAset] = useState([]);

        useEffect(() => {
        axios.get('http://localhost:3001/show_aset')
            .then(response => {
            setAset(response.data);
            })
            .catch(error => {
            console.error('Error fetching aset:', error);
            });
        }, []);

        const handleDelete = async (id_aset) => {
            try {
                const response = await axios.delete(`http://localhost:3001/remove_aset/${id_aset}`);
                console.log(response);
                if (response.status === 200) {
                    // Hapus tiket berhasil
                    // Lakukan refresh data tiket
                    const updatedAset = aset.filter(item => item.id_aset !== id_aset);
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
                <th scope="col" className="px-6 py-3">Lokasi Aset</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
            </thead>
            <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {aset.map((item, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.nama}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.lokasi}</td>
                    <td>
                        
                    <button className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4">
                    <FaRegEdit className="text-xl"/>
                    </button>

                    <button className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4"
                    onClick={() => handleDelete(item.id_aset)}>
                    <MdDeleteOutline className="text-xl" />
                    </button>
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
