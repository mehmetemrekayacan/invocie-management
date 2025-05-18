/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import DataTable from "../components/DataTable";

// Icon components
const DateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ClientIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const AmountIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M12 1V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StatusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Invoicetable({ invoices: initialInvoices = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', icon: <DateIcon />, sortable: true },
    { key: 'client', label: 'CLIENT', icon: <ClientIcon />, sortable: true },
    { key: 'billed', label: 'AMOUNT', icon: <AmountIcon />, sortable: true,
      render: (item) => <span className="amount">${formatAmount(item.billed)}</span> },
    { key: 'status', label: 'STATUS', icon: <StatusIcon />, sortable: false,
      render: (item) => <span className={`status-badge ${item.status === 1 ? 'status-receipt' : 'status-given'}`}>{formatStatus(item.status)}</span> }
  ];

  const filters = [
    { value: 'All', label: 'All' },
    { value: 'Receipt', label: 'Received' },
    { value: 'Given', label: 'Given' }
  ];

  const editFormFields = [
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'client', label: 'Client', type: 'text' },
    { name: 'billed', label: 'Amount', type: 'number', parseValue: (value) => parseFloat(value) },
    { name: 'status', label: 'Status', type: 'select',
      options: [
        { value: 1, label: 'Received' },
        { value: 2, label: 'Given' }
      ],
      parseValue: (value) => parseInt(value)
    }
  ];

  return (
    <DataTable
      data={initialInvoices}
      isLoading={isLoading}
      columns={columns}
      filters={filters}
      editFormFields={editFormFields}
      editFormTitle="Edit Invoice Record"
      emptyMessage="No Invoice Records Yet"
      emptySubMessage="Please create a new record to add invoice entries."
    />
  );
}
