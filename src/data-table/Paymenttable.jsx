/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import DataTable from "../components/DataTable";

// İkon bileşenleri
const DateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DetailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TypeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
    <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 10H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function Paymenttable({ payments: initialPayments = [], isLoading = false }) {
  const columns = [
    { key: 'date', label: 'DATE', icon: <DateIcon />, sortable: true },
    { key: 'paymentDetail', label: 'PAYMENT DETAIL', icon: <DetailIcon />, sortable: true },
    { key: 'paymentType', label: 'PAYMENT TYPE', icon: <TypeIcon />, sortable: true,
      render: (item) => {
        const paymentTypeMap = {
          'Cash': { label: 'Cash', class: 'cash' },
          'Credit Card': { label: 'Credit Card', class: 'credit' },
          'Bank Transfer': { label: 'Bank Transfer', class: 'bank' }
        };
        const type = paymentTypeMap[item.paymentType] || { label: item.paymentType, class: 'other' };
        return <span className={`payment-type ${type.class}`}>{type.label}</span>;
      }
    },
    { key: 'amount', label: 'AMOUNT', icon: <AmountIcon />, sortable: true,
      render: (item) => <span className="amount">${formatAmount(item.amount)}</span> },
    { key: 'status', label: 'STATUS', icon: <StatusIcon />, sortable: false,
      render: (item) => {
        const statusClass = item.status === 1 ? 'status-receipt' : 'status-given';
        const statusText = formatStatus(item.status);
        return <span className={`status-badge ${statusClass}`}>{statusText}</span>;
      }
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
    { name: 'paymentType', label: 'Payment Type', type: 'select',
      options: [
        { value: 'Cash', label: 'Cash' },
        { value: 'Credit Card', label: 'Credit Card' },
        { value: 'Bank Transfer', label: 'Bank Transfer' }
      ]
    },
    { name: 'amount', label: 'Amount', type: 'number', parseValue: (value) => parseFloat(value) },
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
      data={initialPayments}
      isLoading={isLoading}
      columns={columns}
      filters={filters}
      editFormFields={editFormFields}
      editFormTitle="Ödeme Kaydı Düzenle"
      emptyMessage="Henüz Ödeme Kaydı Yok"
      emptySubMessage="Lütfen ödeme girişi eklemek için yeni bir kayıt oluşturun."
    />
  );
}
