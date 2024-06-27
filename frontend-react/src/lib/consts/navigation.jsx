import {
	HiOutlineUsers,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineDocumentText
} from 'react-icons/hi'
import { IoTicketOutline } from "react-icons/io5";
import { BiBarChart, BiServer } from "react-icons/bi";
import { AiOutlineSolution } from "react-icons/ai";
import { MdOutlineEngineering, MdHistory } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <BiBarChart />,
		roles: [1,2]
	},
	{
		key: 'ticket',
		label: 'Ticket',
		path: '/ticket',
		icon: <IoTicketOutline />,
		roles: [1,3]
	},
	{
		key: 'aset',
		label: 'Aset',
		path: '/aset',
		icon: <BiServer />,
		roles: [1]
	},
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers />,
		roles: [1]
	},
	{
		key: 'teknisi',
		label: 'Teknisi',
		path: '/teknisi',
		icon: <MdOutlineEngineering />,
		roles: [2]
	},
	{
		key: 'history',
		label: 'History',
		path: '/history',
		icon: <MdHistory />,
		roles: [1,3]
	},
	{
		key: 'solusi',
		label: 'Solusi Populer',
		path: '/solusi',
		icon: <AiOutlineSolution />,
		roles: [3,2,1]
	},
	{
		key: 'report',
		label: 'Summary Report',
		path: '/report',
		icon: <HiOutlineDocumentText />,
		roles: [1]
	},
	
	
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]