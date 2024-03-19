import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { parseISO, format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Link to="/form-user">
            <button className="bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-user')}>
                Buat User
            </button>
        </Link>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Jabatan</th>
                <th scope="col" className="px-6 py-3">Peran</th>
                <th scope="col" className="px-6 py-3">Created at</th>
                <th scope="col" className="px-6 py-3">Edited at</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
            </thead>
            <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {user.map((item, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.username}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.email}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.jabatan}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.id_peran}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.edited_at ? format(parseISO(item.edited_at), "dd MMMM yyyy, HH:mm") : 'Belum diedit'}</td>
                    <td>

                    <button className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4">
                    <FaRegEdit className="text-xl"/>
                    </button>

                    <button 
                    onClick={() => handleDelete(item.id_user)}
                    className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4">
                    <MdDeleteOutline className="text-xl"/>
                    </button>
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
