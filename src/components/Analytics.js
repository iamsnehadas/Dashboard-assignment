import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    BarElement, 
    PointElement, 
    CategoryScale, 
    LinearScale, 
    ArcElement 
} from 'chart.js';
import { dummyLeads } from '../data/dummyData'; 

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ArcElement
);

const Analytics = () => {
    
    const leadStatusCounts = dummyLeads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
    }, {});

    
    const barChartData = {
        labels: Object.keys(leadStatusCounts),
        datasets: [
            {
                label: 'Lead Status',
                data: Object.values(leadStatusCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    
    const pieChartData = {
        labels: Object.keys(leadStatusCounts),
        datasets: [
            {
                data: Object.values(leadStatusCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    
    const monthlyData = {};
    dummyLeads.forEach(lead => {
        const month = new Date(lead.dateAdded).toLocaleString('default', { month: 'long' }); // Extract month from date
        monthlyData[month] = monthlyData[month] || { count: 0, converted: 0, totalValue: 0 };

        
        monthlyData[month].count += 1;

        
        if (lead.status === 'Converted') {
            monthlyData[month].converted += 1;
            monthlyData[month].totalValue += lead.leadValue || 0; 
        } else {
            monthlyData[month].totalValue += lead.leadValue || 0; 
        }
    });

    const lineChartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Converted Leads Rate (%)',
                data: Object.values(monthlyData).map(data => ((data.converted / data.count) * 100).toFixed(2)),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const barChartForValueData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Total Lead Value',
                data: Object.values(monthlyData).map(data => data.totalValue),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    return (
        <div className="analytics">
            <h2>Analytics</h2>
            <div className="charts">
                <div className="chart-container">
                    <h3>Lead Status Distribution (Bar Chart)</h3>
                    <Bar data={barChartData} />
                </div>
                <div className="chart-container">
                    <h3>Lead Status Distribution (Pie Chart)</h3>
                    <Pie data={pieChartData} />
                </div>
                <div className="chart-container">
                    <h3>Converted Leads Rate (%) (Line Chart)</h3>
                    <Line data={lineChartData} />
                </div>
                <div className="chart-container">
                    <h3>Total Lead Value per Month (Bar Chart)</h3>
                    <Bar data={barChartForValueData} />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
