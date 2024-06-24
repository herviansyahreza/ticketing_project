import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Urgent: 20,
		High: 30,
		Medium: 50,
		Low: 80,

	},
	{
		name: 'Feb',
		Urgent: 10,
		High: 20,
		Medium: 30,
		Low: 40,
	},
	{
		name: 'Mar',
		Urgent: 15,
		High: 32,
		Medium: 48,
		Low: 49,
	},
	{
		name: 'Apr',
		Urgent: 8,
		High: 10,
		Medium: 17,
		Low: 20,
	},
	{
		name: 'May',
		Urgent: 2,
		High: 5,
		Medium: 50,
		Low: 40,
	},
	{
		name: 'Jun',
		Urgent: 10,
		High: 20,
		Medium: 50,
		Low: 100,
	},
	{
		name: 'July',
		Urgent: 28,
		High: 25,
		Medium: 55,
		Low: 88,
	},
	{
		name: 'Aug',
		Urgent: 1,
		High: 28,
		Medium: 30,
		Low: 50,
	},
	{
		name: 'Sep',
		Urgent: 8,
		High: 10,
		Medium: 25,
		Low: 49,
	},
	{
		name: 'Oct',
		Urgent: 15,
		High: 20,
		Medium: 20,
		Low: 30,
	},
	{
		name: 'Nov',
		Urgent: 4,
		High: 14,
		Medium: 40,
		Low: 59,
	},
	{
		name: 'Dec',
		Urgent: 15,
		High: 20,
		Medium: 15,
		Low: 40,
	}
]

export default function TicketReportChart() {
	return (
		<div className="h-screen overflow-auto bg-gray-100 p-4">
			<div className="h-[22rem] w-[72rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mb-8">
				<strong className="text-gray-700 font-medium">Ticket Report by Month</strong>
				<div className="mt-3 w-full flex-1 text-xs">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 20,
								right: 10,
								left: -10,
								bottom: 0
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
							data={data}
							margin={{
								top: 20,
								right: 10,
								left: -10,
								bottom: 0
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
		</div>
	);
}