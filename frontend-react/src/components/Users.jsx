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
