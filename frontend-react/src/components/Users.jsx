import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { parseISO, format } from "date-fns";

export default function UsersList() {
    const navigate = useNavigate()
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

        const handleDelete = async (id_user) => {
            try {
                const response = await axios.delete(`http://localhost:3001/remove/${id_user}`);
                console.log(response);
                if (response.status === 200) {
                    // Hapus tiket berhasil
                    // Lakukan refresh data tiket
                    const updatedUser = user.filter(item => item.id_user !== id_user);
                    setUser(updatedUser);
                    alert('Hapus user berhasil');
                } else {
                    // Hapus tiket gagal
                    alert('Hapus user gagal');
                }
            } catch (error) {
                // Terjadi kesalahan saat melakukan permintaan hapus tiket
                alert('Terjadi kesalahan saat menghapus user');
            }
        };

    return (
        <div>
            <Link to="/form-user">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-user')}>
                Buat User
            </button>
        </Link>
            <table>
            <thead>
                <tr>
                <th>No</th>
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
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.jabatan}</td>
                    <td>{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                    <td>{item.edited_at} WIB</td>
                    <td>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 mb-4">
                        Edit
                    </button>
                    <button 
                    onClick={() => handleDelete(item.id_user)}
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
