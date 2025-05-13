/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import DataTable from "../components/DataTable";

export default function Paymenttable({ payments: initialPayments = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', sortable: true },
    { key: 'paymentDetail', label: 'PAYMENT DETAIL', sortable: true },
    { 
      key: 'paymentType', 
      label: 'PAYMENT TYPE', 
      sortable: true,
      render: (item) => (
        <span className={`payment-type ${item.paymentType.toLowerCase()}`}>
          {item.paymentType}
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
    { name: 'paymentDetail', label: 'Payment Detail', type: 'text' },
    { 
      name: 'paymentType', 
      label: 'Payment Type', 
      type: 'select',
      options: [
        { value: 'Cash', label: 'Cash' },
        { value: 'Credit Card', label: 'Credit Card' },
        { value: 'Bank Transfer', label: 'Bank Transfer' }
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
        { value: 1, label: 'Received' },
        { value: 2, label: 'Given' }
      ],
      parseValue: (value) => parseInt(value)
    }
  ];

  return (
    <DataTable
      data={initialPayments}
      isLoading={isLoading}
      columns={columns}
      filters={filters}
      editFormFields={editFormFields}
      editFormTitle="Edit Payment Record"
      emptyMessage="No Payment Records Yet"
      emptySubMessage="Please create a new record to add payment entries."
    />
  );
}
