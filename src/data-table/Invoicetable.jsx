/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import DataTable from "../components/DataTable";

export default function Invoicetable({ invoices: initialInvoices = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', sortable: true },
    { key: 'client', label: 'CLIENT', sortable: true },
    { 
      key: 'billed', 
      label: 'INVOICE', 
      sortable: true,
      render: (item) => (
        <span className="amount">${formatAmount(item.billed)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      sortable: false,
      render: (item) => (
        <span className={`status-badge ${item.status === 1 ? 'status-receipt' : 'status-given'}`}>
          {formatStatus(item.status)}
        </span>
      )
    }
  ];

  const filters = [
    { value: 'All', label: 'All' },
    { value: 'Receipt', label: 'Received' },
    { value: 'Given', label: 'Given' }
  ];

  const editFormFields = [
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'client', label: 'Client', type: 'text' },
    { 
      name: 'billed', 
      label: 'Invoice Amount', 
      type: 'number',
      parseValue: (value) => parseFloat(value)
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select',
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
