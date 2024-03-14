import React from 'react';
// import { Link } from 'react-router-dom';
import DashboardStatsGrid from './DashboardStatGrid';

export default function Dashboard() {
    return (
        <div className='flex gap-4'>
            <DashboardStatsGrid />
        </div>
    );
}