/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import DataTable from "../components/DataTable";

export default function Taxtable({ taxes: initialTaxes = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', sortable: true },
    { key: 'taxDetail', label: 'TAX DETAIL', sortable: true },
    { 
      key: 'taxType', 
      label: 'TAX TYPE', 
      sortable: true,
      render: (item) => (
        <span className={`tax-type ${item.taxType.toLowerCase()}`}>
          {item.taxType}
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
        <span className={`status-badge ${item.status === 1 ? 'status-paid' : 'status-unpaid'}`}>
          {formatStatus(item.status)}
        </span>
      )
    }
  ];

  const filters = [
    { value: 'All', label: 'All' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' }
  ];

  const editFormFields = [
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'taxDetail', label: 'Tax Detail', type: 'text' },
    { 
      name: 'taxType', 
      label: 'Tax Type', 
      type: 'select',
      options: [
        { value: 'Income Tax', label: 'Income Tax' },
        { value: 'VAT', label: 'VAT' },
        { value: 'Corporate Tax', label: 'Corporate Tax' },
        { value: 'Other', label: 'Other' }
      ]
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
        { value: 1, label: 'Paid' },
        { value: 2, label: 'Unpaid' }
      ],
      parseValue: (value) => parseInt(value)
    }
  ];

  return (
    <DataTable
      data={initialTaxes}
      isLoading={isLoading}
      columns={columns}
      filters={filters}
      editFormFields={editFormFields}
      editFormTitle="Edit Tax Record"
      emptyMessage="No Tax Records Yet"
      emptySubMessage="Please create a new record to add tax entries."
    />
  );
}
