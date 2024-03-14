import {
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { IoTicketOutline } from "react-icons/io5";
import { BiBarChart, BiServer } from "react-icons/bi";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <BiBarChart />
	},
	{
		key: 'ticket',
		label: 'Ticket',
		path: '/ticket',
		icon: <IoTicketOutline />
	},
	{
		key: 'aset',
		label: 'Aset',
		path: '/aset',
		icon: <BiServer />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers />
	},
	{
		key: 'history',
		label: 'History',
		path: '/history',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
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