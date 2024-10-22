// src/components/Reports.js
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import { dummyLeads } from '../data/dummyData'; // Import your dummy data

const Reports = () => {
    const handleDownload = (format) => {
        if (format === 'PDF') {
            downloadPDF();
        } else if (format === 'CSV') {
            downloadCSV();
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text('Leads Report', 20, 20);

        // Set up the table headers
        doc.setFontSize(12);
        const headers = ['ID', 'Name', 'Email', 'Status', 'Date Added', 'Lead Value'];
        const data = dummyLeads.map(lead => [lead.id, lead.name, lead.email, lead.status, lead.dateAdded, lead.leadValue]);

        // Add headers to the PDF using autoTable
        doc.autoTable({
            head: [headers],
            body: data,
        });

        doc.save('leads_report.pdf');
    };

    const downloadCSV = () => {
        const csvRows = [];
        const headers = ['ID', 'Name', 'Email', 'Status', 'Date Added', 'Lead Value'];
        csvRows.push(headers.join(',')); // Add headers to CSV

        // Add data rows
        dummyLeads.forEach(lead => {
            const values = [lead.id, lead.name, lead.email, lead.status, lead.dateAdded, lead.leadValue];
            csvRows.push(values.join(','));
        });

        // Create a Blob from the CSV data
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and click it to trigger the download
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'leads_report.csv');
        a.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="reports">
            <h2>Reports</h2>
            <p>Select the format to download the report:</p>
            <button className="report-button" onClick={() => handleDownload('PDF')}>Download PDF</button>
            <button className="report-button" onClick={() => handleDownload('CSV')}>Download CSV</button>
        </div>
    );
};

export default Reports;
