import React from 'react'

const users = [
    {
        judul: 'Laporan Wifi Perpustakaan Lt.2 Rusak',
        pelapor: 'roberto',
        email: 'roberto@gmail.com',
        aset: 'Wifi Perpustakaan kanan',
        laporan: 'Sudah 3 hari wifi tidak menyala dan mengganggu perkuliahan karena tidak ada internet',
        status: 'Open',
        created_at: '2021-10-10',
        edited_at: '2021-10-11',
    },
    {
        judul: 'Laporan Wifi Kelas Informatika Mati',
        pelapor: 'santiago',
        email: 'santiago@gmail.com',
        aset: 'Wifi Unhan 2nd-class',
        laporan: 'Sudah 4 jam wifi tidak menyala dan mengganggu perkuliahan karena tidak ada internet',
        status: 'Open',
        created_at: '2021-10-10',
        edited_at: '2021-10-11',
    },
    // Add the remaining users here...
];

export default function UsersList() {

    return (
        <div>
            <table>
            <thead>
                <tr>
                <th className="w-64">Judul</th>
                <th>Pelapor</th>
                <th>Email</th>
                <th>Aset</th>
                <th className="w-64">Laporan</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Edited at</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.judul}</td>
                    <td>{user.pelapor}</td>
                    <td>{user.email}</td>
                    <td>{user.aset}</td>
                    <td>{user.laporan}</td>
                    <td>{user.status}</td>
                    <td>{user.created_at}</td>
                    <td>{user.edited_at}</td>
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
