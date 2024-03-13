import React from 'react'
import classNames from 'classnames'
import { FaHandsHelping } from "react-icons/fa";
import { DASHBOARD_SIDEBAR_LINKS ,DASHBOARD_SIDEBAR_BOTTOM_LINKS} from '../../lib/consts/navigation';
import { Link ,useLocation} from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
    <div className='bg-neutral-800 w-65 flex flex-col text-white'>
        <div className='flex items-center gap-3 px-4 py-3'>
        <FaHandsHelping fontSize={24}/>
        <span className='text-neutral-100 text-lg font-bold'>Helpdesk Unhan</span>
        </div>
        <div className='py-8 flex flex-1 flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS.map((item) =>(
                <SidebarLink key={item.key} item={item} />
            ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) =>(
                <SidebarLink key={item.key} item={item} />
            ))}
            <div className={classNames('text-red-500',linkClass)}>
            <span className='text-xl'>
                <HiOutlineLogout/>
                </span>
                Logout
            </div>
        </div>
		</div>
    )
}

function SidebarLink({item}) {
    const {pathname} = useLocation()

    return (
        <Link to={item.path} className={classNames(
            pathname === item.path ?'bg-neutral-700 text-white': 'text-neutral-400',
            linkClass)}>
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    )
}