/* eslint-disable react/prop-types */
import React from "react";
import { formatStatus, formatAmount, formatType } from "../components/Utils";
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
    <path d="M19.5 12.5722C19.5 14.0382 19.0171 15.4677 18.1092 16.6669C17.2013 17.8661 15.9128 18.7806 14.4361 19.2813C12.9593 19.7819 11.3739 19.8449 9.86031 19.461C8.34677 19.077 6.97347 18.2647 5.9038 17.1224C4.83413 15.9801 4.12298 14.4908 3.86193 12.8818C3.60088 11.2728 3.80135 9.6144 4.43927 8.11093C5.07719 6.60746 6.12578 5.32849 7.45732 4.45308C8.78886 3.57766 10.3433 3.14888 11.9296 3.22403" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L12 16L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function Incometable({ products: initialProducts = [], isLoading = false }) {
  // Income type mapping
  const incomeTypeMap = {
    1: { label: 'Sales', class: 'sales' },
    2: { label: 'Service', class: 'service' },
    3: { label: 'Investment', class: 'investment' },
    4: { label: 'Rental', class: 'rental' },
    5: { label: 'Commission', class: 'commission' },
    6: { label: 'Royalty', class: 'royalty' },
    7: { label: 'Other', class: 'other' }
  };

  const columns = [
    { 
      key: 'date', 
      label: 'DATE', 
      icon: <DateIcon />, 
      sortable: true 
    },
    { 
      key: 'incomeDetail', 
      label: 'INCOME DETAIL', 
      icon: <DetailIcon />, 
      sortable: true 
    },
    { 
      key: 'incomeType', 
      label: 'INCOME TYPE', 
      icon: <TypeIcon />, 
      sortable: true,
      render: (item) => {
        const type = incomeTypeMap[item.incomeType] || { 
          label: formatType(item.incomeType), 
          class: 'other' 
        };
        
        return (
          <span className={`type-badge ${type.class}`}>
            {type.label}
          </span>
        );
      }
    },
    { 
      key: 'amount', 
      label: 'AMOUNT', 
      icon: <AmountIcon />, 
      sortable: true,
      render: (item) => (
        <span className="amount">${formatAmount(item.amount)}</span>
      )
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      icon: <StatusIcon />, 
      sortable: false,
      render: (item) => {
        // Fix for status display - ensure correct status is shown
        let statusClass = 'status-not-received';
        let statusText = 'Not Received';
        
        if (item.status === 1) {
          statusClass = 'status-receipt';
          statusText = 'Received';
        }
        
        return (
          <span className={`status-badge ${statusClass}`}>
            {statusText}
          </span>
        );
      }
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
        { value: 1, label: 'Sales' },
        { value: 2, label: 'Service' },
        { value: 3, label: 'Investment' },
        { value: 4, label: 'Rental' },
        { value: 5, label: 'Commission' },
        { value: 6, label: 'Royalty' },
        { value: 7, label: 'Other' }
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
      luxuryMode={true}
    />
  );
}
