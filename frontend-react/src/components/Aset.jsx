import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <Link to="/form-aset">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-aset')}>
                Buat Aset
            </button>
        </Link>

            <table>
            <thead>
                <tr>
                <th>No</th>
                <th>Nama Aset</th>
                <th>Lokasi Aset</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {aset.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.lokasi}</td>
                    <td>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 mb-4">
                        Edit
                    </button>
                    <button 
                    onClick={() => handleDelete(item.id_aset)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                        Hapus
                    </button>
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
