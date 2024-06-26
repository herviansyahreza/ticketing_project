import React, {useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
// import { Card } from "@material-tailwind/react";
import { parseISO, format, set } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


export default function TicketList () {
    // const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);  // State untuk menyimpan ID tiket yang dipilih untuk dihapus

    const navigate = useNavigate()
    const [tiket, setTiket] = useState([]);

    useEffect(() => {
        // Mengambil userId dari localStorage
        const userId = localStorage.getItem('id');
    
        if (userId) {
          // Mengirim permintaan GET ke backend dengan userId dari localStorage
        axios.get(`http://localhost:3001/show_tiket_byUser/${userId}`)
            .then(response => {
                setTiket(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching tiket:', error);
            });
        } else {
            console.error('ID pengguna tidak ditemukan di localStorage');
        }
    }, []);


        const handleDelete = async (id) => {
            try {
                const response = await axios.delete(`http://localhost:3001/remove_tiket/${id}`);
                console.log(response);
                if (response.status === 200) {
                    // Hapus tiket berhasil
                    // Lakukan refresh data tiket
                    const updatedTiket = tiket.filter(item => item.id !== id);
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


	return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-4">
        <Link to="/form-ticket-user">
            <button className="bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded mb-4" onClick={() => navigate('/form-ticket-user')}>
                Buat Tiket
            </button>
        </Link>
        {/* <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Cari tiket..."
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <button className="ml-2 bg-neutral-300 hover:bg-neutral-400 text-black uppercase font-bold py-2 px-4 rounded">
                <FaSearch className="text-xl" />
                </button>
            </div> */}
        </div>

    {/* <Card className="h-full w-full overflow-scroll"> */}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Judul</th>
            {/* <th scope="col" className="px-6 py-3">Pelapor</th> */}
            <th scope="col" className="px-6 py-3">Aset</th>
            {/* <th scope="col" className="px-6 py-3">Email</th> */}
            {/* <th scope="col" className="px-6 py-3">Aset</th> */}
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Deskripsi Laporan</th>
            <th scope="col" className="px-6 py-3">Solusi Laporan</th>
            <th scope="col" className="px-6 py-3">Prioritas</th>
            {/* <th scope="col" className="px-6 py-3">Lampiran Foto</th> */}
            {/* <th scope="col" className="px-6 py-3">Created at</th>
            <th scope="col" className="px-6 py-3">Edited at</th> */}
            <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            {tiket.map((item, index) => (
            <tr key={index}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.judul}</td>
                {/* <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.users_username}</td> */}
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.aset_nama}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.status_nama}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.deskripsi}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.solusi || "Belum Diproses"}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.prioritas_nama || "Belum Ditentukan"}</td>
                {/* <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Foto</td> */}
                {/* <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{format(parseISO(item.created_at), "dd MMMM yyyy, HH:mm")} WIB</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.edited_at ? format(parseISO(item.edited_at), "dd MMMM yyyy, HH:mm") : 'Belum diedit'}</td> */}
                <td>

                {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                onClick={ () => navigate(`/edit-ticket/${item.id}`) }
                >
                <FaRegEdit className="text-xl"/>
                </button> */}
                
                {/* {showModalEdit && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-100 bg-opacity-40"
                    onClick={() => setShowModalEdit(false)}
                >
                    <div className="relative p-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mx-auto my-auto">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Edit Data Tiket
                            </h2>
                            <form  onSubmit={handleEdit} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                                </label>
                                <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                
                            <div>
                                <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    Forgot password?
                                    </a>
                                </div>
                                </div>
                                <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                
                            <div className="flex justify-between">
                                <button
                                type="submit"
                                className="mb-10 flex justify-center py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-yellow-400 rounded-lg border border-gray-200 hover:bg-yellow-500 hover:text-neutral-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                                >
                                Edit Data
                                </button>

                                <button
                                type="submit"
                                className="mb-10 flex justify-center py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-neutral-200 rounded-lg border border-gray-200 hover:bg-neutral-300 hover:text-neutral-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                                >
                                Batalkan
                                </button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                )} */}

                <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-neutral-100 hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded mr-2 mb-4 border border-black"
                onClick={() => {
                    setSelectedTicketId(item.id);  // Set ID tiket yang dipilih untuk dihapus
                    setShowModalDelete(true)
                    }}>
                <MdDeleteOutline className="text-xl" />
                </button>
                {showModalDelete && (
                <div
                    id="popup-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-100 bg-opacity-40"
                    onClick={() => setShowModalDelete(false)}
                >
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Apakah anda yakin ingin menghapus tiket ini?
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModalDelete(false);
                                    handleDelete(selectedTicketId);  // Hapus tiket dengan ID yang dipilih
                                    // handleDelete(item.id);
                                }}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Ya, Saya yakin
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModalDelete(false)}
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
        {/* </Card> */}
        </div>
    )
};
