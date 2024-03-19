import React, {useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
// import { Card } from "@material-tailwind/react";
import { parseISO, format } from "date-fns";


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
    <div>
        <Link to="/form-ticket">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-ticket')}>
                Buat Tiket
            </button>
        </Link>
    {/* <Card className="h-full w-full overflow-scroll"> */}
    <table>
        <thead>
            <tr>
            <th>No</th>
            <th className="w-64">Judul</th>
            <th>Pelapor</th>
            <th>Email</th>
            <th>Aset</th>
            <th>Prioritas</th>
            <th className="w-64">Laporan</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Edited at</th>
            <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            {tiket.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.judul}</td>
                <td>{item.nama_client}</td>
                <td>{item.email_client}</td>
                <td>{item.aset}</td>
                <td>{item.prioritas_id}</td>
                <td>{item.laporan}</td>
                <td>{item.status_id}</td>
                <td>{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                <td>{item.edited_at ? format(parseISO(item.edited_at), "dd MMMM yyyy, HH:mm") : 'Belum diedit'}</td>
                <td>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 mb-4">
                    Edit
                </button>

                <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(item.id_tiket)}>
                    Hapus
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
