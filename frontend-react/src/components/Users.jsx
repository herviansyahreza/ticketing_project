import React, {useState, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// const users = [
//     {
//         judul: 'Laporan Wifi Perpustakaan Lt.2 Rusak',
//         pelapor: 'roberto',
//         email: 'roberto@gmail.com',
//         aset: 'Wifi Perpustakaan kanan',
//         laporan: 'Sudah 3 hari wifi tidak menyala dan mengganggu perkuliahan karena tidak ada internet',
//         status: 'Open',
//         created_at: '2021-10-10',
//         edited_at: '2021-10-11',
//     },
//     {
//         judul: 'Laporan Wifi Kelas Informatika Mati',
//         pelapor: 'santiago',
//         email: 'santiago@gmail.com',
//         aset: 'Wifi Unhan 2nd-class',
//         laporan: 'Sudah 4 jam wifi tidak menyala dan mengganggu perkuliahan karena tidak ada internet',
//         status: 'Open',
//         created_at: '2021-10-10',
//         edited_at: '2021-10-11',
//     },
//     // Add the remaining users here...
// ];

export default function UsersList() {
    // const navigate = useNavigate()
    const [user, setUser] = useState([]);

        useEffect(() => {
        axios.get('http://localhost:3001/show_user')
            .then(response => {
            setUser(response.data);
            })
            .catch(error => {
            console.error('Error fetching user:', error);
            });
        }, []);

    return (
        <div>
            <table>
            <thead>
                <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Jabatan</th>
                <th>Created at</th>
                <th>Edited at</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {user.map((item, index) => (
                <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.created_at}</td>
                    <td>{item.edited_at}</td>
                    <td>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 mb-4">
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
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
