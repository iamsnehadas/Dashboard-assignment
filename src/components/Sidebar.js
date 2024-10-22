import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Ezy Metrics</h2>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/leads">Leads</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
