import React, { useState } from 'react';
import Widget from './Widget';
import { dummyLeads } from '../data/dummyData'; // Importing dummy leads data

const Dashboard = () => {
    const [widgets, setWidgets] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Calculating lead-related metrics
    const totalLeads = dummyLeads.length;
    const convertedLeads = dummyLeads.filter(lead => lead.status === 'Converted').length;
    const conversionRate = totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    const addWidget = () => {
        if (title && content) {
            const newWidget = { id: Date.now(), title, content };
            setWidgets([...widgets, newWidget]);
            setTitle('');
            setContent('');
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="widget-form">
                <input 
                    type="text" 
                    placeholder="Widget Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Widget Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <button className="add-widget" onClick={addWidget}>Add Widget</button>
            </div>
            <div className="widgets">
                {/* Displaying the lead-related widgets */}
                <div className="widget-container">
                    <Widget title="Total Leads" content={totalLeads} />
                </div>
                <div className="widget-container">
                    <Widget title="Converted Leads" content={convertedLeads} />
                </div>
                <div className="widget-container">
                    <Widget title="Conversion Rate" content={`${conversionRate}%`} />
                </div>
                
                {/* Displaying user-added widgets */}
                {widgets.map(widget => (
                    <div key={widget.id} className="widget-container">
                        <Widget title={widget.title} content={widget.content} />
                        <button className="remove-widget" onClick={() => setWidgets(widgets.filter(w => w.id !== widget.id))}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
