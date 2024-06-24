import React, { useState } from 'react';
import DashboardStatsGrid from './DashboardStatGrid';
import DashboardChart from './DashboardChart';
import DashboardClosed from './DashboardChartClosed';
import DashboardReopened from './DashboardChartReopened';
import DashboardResolved from './DashboardChartResolved';
import DashboardInProgress from './DashboardChartInProgress';
import DashboardOnHold from './DashboardChartOnHold';

export default function Dashboard() {
    const [chartType, setChartType] = useState('chart1');
    const [selectedChart, setSelectedChart] = useState('chart1');

    const handleSetChartType = (chart) => {
        setChartType(chart);
        setSelectedChart(chart);
    };

    return (
        <div className='flex gap-4 flex-col'>
            <DashboardStatsGrid setChartType={handleSetChartType} selectedChart={selectedChart} />
            <div className="flex flex-row gap-4 m-10">
                {chartType === 'chart1' && <DashboardChart />}
                {chartType === 'chart2' && <DashboardClosed />}
                {chartType === 'chart3' && <DashboardReopened />}
                {chartType === 'chart4' && <DashboardResolved />}
                {chartType === 'chart5' && <DashboardInProgress />}
                {chartType === 'chart6' && <DashboardOnHold />}
            </div>
        </div>
    );
}
