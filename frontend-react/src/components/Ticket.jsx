import React, {useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
// import { Card } from "@material-tailwind/react";
import { parseISO, format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


export default function TicketList () {
    const navigate = useNavigate()
    const [tiket, setTiket] = useState([]);

        useEffect(() => {
        axios.get('http://localhost:3001/show_tiket')
            .then(response => {
            setTiket(response.data);
            })
            .catch(error => {
            console.error('Error fetching tiket:', error);
            });
        }, []);

        const handleDelete = async (id_tiket) => {
            try {
                const response = await axios.delete(`http://localhost:3001/remove_tiket/${id_tiket}`);
                console.log(response);
                if (response.status === 200) {
                    // Hapus tiket berhasil
                    // Lakukan refresh data tiket
                    const updatedTiket = tiket.filter(item => item.id_tiket !== id_tiket);
                    setTiket(updatedTiket);
                    alert('Hapus tiket berhasil');
                } else {
                    // Hapus tiket gagal
                    alert('Hapus tiket gagal');
                }
            } catch (error) {
                // Terjadi kesalahan saat melakukan permintaan hapus tiket
                alert('Terjadi kesalahan saat menghapus tiket');
            }
        };

        const getStatusColor = async(id_status) => {
            try {
                const response = await axios.get(`http://localhost:3001/show_status/id_status=${id_status}`);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

	return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Link to="/form-ticket">
            <button className="bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-ticket')}>
                Buat Tiket
            </button>
        </Link>
    {/* <Card className="h-full w-full overflow-scroll"> */}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Judul</th>
            <th scope="col" className="px-6 py-3">Pelapor</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Aset</th>
            <th scope="col" className="px-6 py-3">Prioritas</th>
            <th scope="col" className="px-6 py-3">Deskripsi Laporan</th>
            <th scope="col" className="px-6 py-3">Status</th>
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
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.nama_client}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.email_client}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.aset}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.prioritas_id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.laporan}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.status_id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.edited_at ? format(parseISO(item.edited_at), "dd MMMM yyyy, HH:mm") : 'Belum diedit'}</td>
                <td>

                <button className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4">
                <FaRegEdit className="text-xl"/>
                </button>

                <button className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4"
                onClick={() => handleDelete(item.id_tiket)}>
                <MdDeleteOutline className="text-xl" />
                </button>
            </td>
            </tr>
            ))}
        </tbody>
        </table>
        {/* </Card> */}
        </div>
    )
};
