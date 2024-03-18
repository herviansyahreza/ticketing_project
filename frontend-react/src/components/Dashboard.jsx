import React from 'react';
// import { Link } from 'react-router-dom';
import DashboardStatsGrid from './DashboardStatGrid';
import DashboardChart from './DashboardChart';

export default function Dashboard() {
    return (
        <div className='flex gap-4 flex-col'>
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 m-10">
                <DashboardChart />
            </div>
        </div>
    );
}