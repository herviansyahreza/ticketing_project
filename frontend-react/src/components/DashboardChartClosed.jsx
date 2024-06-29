import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const asetNames = {
    21: "Wifi Kemhan go.id",
    22: "Wifi Kadet Mahasiswa",
    23: "Wifi Unhan Mahasiswa",
    13: "Wifi 1st-Class",
    2: "Wifi 2nd-Class",
    12: "Wifi 3rd-Class",
    8: "Wifi 4th-Class",
    14: "Wifi 5th-Class",
    15: "Wifi 6th-Class",
    16: "Wifi 7th-Class",
    17: "Wifi 8th-Class",
    18: "Wifi 9th-Class",
    19: "Wifi 10th-Class",
    20: "Wifi 11th-Class"
};

export default function TicketReportChart() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get_chart');
                const result = response.data;
                const filteredResult = result.filter(item => item.status === 5);
                const formattedData = filteredResult.map(item => ({
                    name: monthNames[parseInt(item.month) - 1],
                    Urgent: parseInt(item.urgent, 10),
                    High: parseInt(item.high, 10),
                    Medium: parseInt(item.medium, 10),
                    Low: parseInt(item.low, 10),
                }));

                // Pastikan semua bulan ada dalam data
                for (let i = 0; i < 12; i++) {
                    const monthName = monthNames[i];
                    const existingMonth = formattedData.find(item => item.name === monthName);
                    if (!existingMonth) {
                        formattedData.push({ name: monthName, Urgent: 0, High: 0, Medium: 0, Low: 0 });
                    }
                }

                formattedData.sort((a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name));

                setData1(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchData2 = async () => {
			try {
				const response = await axios.get('http://localhost:3001/show_aset_byDamage');
				const result = response.data;
				const filteredResult = result.filter(item => item.status === 5);
		
				// Inisialisasi objek untuk menyimpan data unik berdasarkan nama aset
				const uniqueData = {};
		
				// Memasukkan jumlah kerusakan ke dalam uniqueData berdasarkan asetNames
				filteredResult.forEach(item => {
					const asetName = asetNames[item.aset_id]; // Ambil nama aset berdasarkan aset_id
					const kerusakanCount = parseInt(item.jumlah_kerusakan, 10);
		
					// Jika data untuk aset ini belum ada, tambahkan ke uniqueData
					if (!uniqueData[asetName]) {
						uniqueData[asetName] = {
							name: asetName,
							Kerusakan: kerusakanCount
						};
					}
				});
		
				// Ubah objek menjadi array untuk state data2
				const formattedData = Object.values(uniqueData);
		
				// Mengatur state data2 dengan data yang sudah diformat
				setData2(formattedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		

        fetchData1();
        fetchData2();
    }, []);

    return (
        <div className="h-screen overflow-auto bg-gray-100 p-4">
            <div className="h-[22rem] w-[72rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mb-8">
                <strong className="text-gray-700 font-medium">Ticket Report by Month</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data1}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Urgent" fill="#171717" />
                            <Bar dataKey="High" fill="#b91c1c" />
                            <Bar dataKey="Medium" fill="#fbbf24" />
                            <Bar dataKey="Low" fill="#a3e635" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="h-[22rem] w-[72rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
                <strong className="text-gray-700 font-medium">Ticket Report by Asset</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data2}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Kerusakan" fill="#b91c1c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
