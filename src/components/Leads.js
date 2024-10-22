import React from 'react';
import { dummyLeads } from '../data/dummyData';
const Leads = () => {
    return (
        <div className="leads">
            <h2>Leads Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Date Added</th>
                        <th>Lead Value</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyLeads.map(lead => (
                        <tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.status}</td>
                            <td>{lead.dateAdded}</td> 
                            <td>${lead.leadValue.toLocaleString()}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leads;
