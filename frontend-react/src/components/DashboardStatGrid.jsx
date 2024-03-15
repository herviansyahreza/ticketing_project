import React from 'react'
import { AiOutlineExclamation, AiOutlineCloseCircle } from "react-icons/ai";
import { BiTime, BiPauseCircle, BiCheckCircle, BiRefresh } from "react-icons/bi";

export default function DashboardStatsGrid() {
	return (
		<div className="flex gap-4">
			<div className='bg-gray-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<AiOutlineExclamation className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">Open</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">20</strong>
					</div>
				</div>
			</div>

			<div className='bg-yellow-500 rounded-xl h-28 w-48 p-4 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<BiTime className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">In Progress</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">10</strong>
					</div>
				</div>
			</div>

			<div className='bg-red-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<BiPauseCircle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">On Hold</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">7</strong>
					</div>
				</div>
			</div>

			<div className='bg-green-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<BiCheckCircle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">Resolved</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">25</strong>
					</div>
				</div>
			</div>

			<div className='bg-blue-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<AiOutlineCloseCircle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">Closed</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">8</strong>
					</div>
				</div>
			</div>

			<div className='bg-purple-500 rounded-xl h-28 w-48 p-6 flex-1 border border-gray-200 flex items-center'>
				<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
					<BiRefresh className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-xl text-black font-light whitespace-nowrap">Reopened</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-900 font-semibold">8</strong>
					</div>
				</div>
			</div>
		</div>
	)
}
