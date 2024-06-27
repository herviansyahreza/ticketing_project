import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineExclamation, AiOutlineCloseCircle } from "react-icons/ai";
import { BiTime, BiPauseCircle, BiCheckCircle, BiRefresh } from "react-icons/bi";

export default function DashboardStatsGrid({ setChartType, selectedChart }) {
    const [ticketCounts, setTicketCounts] = useState({
        Open: 0,
        'In Progress': 0,
        'On Hold': 0,
        Resolved: 0,
        Closed: 0,
        Reopened: 0
    });

    useEffect(() => {
        const fetchTicketCounts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/count_tiket');
                setTicketCounts(response.data);
            } catch (error) {
                console.error('Error fetching ticket counts:', error);
            }
        };

        fetchTicketCounts();
    }, []);

    const getButtonClass = (chartName) => {
        return selectedChart === chartName
            ? 'border-2 border-gray-950' // Menambahkan kelas CSS untuk meredupkan tombol yang dipilih
            : 'hover:bg-opacity-75';
    };

    return (
        <div className="flex gap-4">
            <div
                className={`bg-gray-400 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart1')}`}
                onClick={() => setChartType('chart1')}
            >
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <AiOutlineExclamation className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">Open</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts.Open}</strong>
                    </div>
                </div>
            </div>

            <div
                className={`bg-yellow-500 rounded-xl h-28 w-48 p-4 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart2')}`}
                onClick={() => setChartType('chart2')}
            >
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <BiTime className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">In Progress</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts['In Progress']}</strong>
                    </div>
                </div>
            </div>

            <div className={`bg-red-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart3')}`}
                onClick={() => setChartType('chart3')}
			>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <BiPauseCircle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">On Hold</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts['On Hold']}</strong>
                    </div>
                </div>
            </div>

            <div className={`bg-green-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart4')}`}
                onClick={() => setChartType('chart4')}
			>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <BiCheckCircle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">Resolved</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts.Resolved}</strong>
                    </div>
                </div>
            </div>

            <div className={`bg-blue-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart5')}`}
                onClick={() => setChartType('chart5')}
			>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <AiOutlineCloseCircle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">Closed</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts.Closed}</strong>
                    </div>
                </div>
            </div>

            <div className={`bg-purple-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center cursor-pointer ${getButtonClass('chart6')}`}
                onClick={() => setChartType('chart6')}
			>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                    <BiRefresh className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-xl text-black font-light whitespace-nowrap">Reopened</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-900 font-semibold">{ticketCounts.Reopened}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
