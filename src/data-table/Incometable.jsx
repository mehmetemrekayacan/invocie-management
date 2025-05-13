/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount, formatType } from "../components/Utils";
import DataTable from "../components/DataTable";

export default function Incometable({ products: initialProducts = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', sortable: true },
    { key: 'incomeDetail', label: 'INCOME DETAIL', sortable: true },
    { 
      key: 'incomeType', 
      label: 'INCOME TYPE', 
      sortable: true,
      render: (item) => (
        <span className="type-badge">
          {formatType(item.incomeType)}
        </span>
      )
    },
    { 
      key: 'amount', 
      label: 'AMOUNT', 
      sortable: true,
      render: (item) => (
        <span className="amount">${formatAmount(item.amount)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      sortable: false,
      render: (item) => (
        <span className={`status-badge ${item.status === 1 ? 'status-receipt' : 'status-not-received'}`}>
          {formatStatus(item.status)}
        </span>
      )
    }
  ];

  const filters = [
    { value: 'All', label: 'All' },
    { value: 'Receipt', label: 'Received' },
    { value: 'Not Received', label: 'Not Received' }
  ];

  const editFormFields = [
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'incomeDetail', label: 'Income Detail', type: 'text' },
    { 
      name: 'incomeType', 
      label: 'Income Type', 
      type: 'select',
      options: [
        { value: 1, label: 'Sale' },
        { value: 2, label: 'Service' },
        { value: 3, label: 'Other' }
      ],
      parseValue: (value) => parseInt(value)
    },
    { 
      name: 'amount', 
      label: 'Amount', 
      type: 'number',
      parseValue: (value) => parseFloat(value)
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select',
      options: [
        { value: 1, label: 'Received' },
        { value: 2, label: 'Not Received' }
      ],
      parseValue: (value) => parseInt(value)
    }
  ];

  return (
    <DataTable
      data={initialProducts}
      isLoading={isLoading}
      columns={columns}
      filters={filters}
      editFormFields={editFormFields}
      editFormTitle="Edit Income Record"
      emptyMessage="No Income Records Yet"
      emptySubMessage="Please create a new record to add income entries."
    />
  );
}
