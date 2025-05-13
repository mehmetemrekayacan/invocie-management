import React, { useState, useMemo, useEffect, useCallback } from "react";
import { formatStatus, formatAmount, formatType } from "./Utils";
import "../data-table/tables.css";
import { useModal } from "./ToastProvider";

export default function DataTable({
  data: initialData = [],
  isLoading = false,
  columns,
  filters,
  emptyMessage = "No Records Yet",
  emptySubMessage = "Please create a new record to add entries.",
  onEdit,
  onDelete,
  editFormFields,
  editFormTitle = "Edit Record"
}) {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const modal = useModal();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const filteredAndSortedData = useMemo(() => {
    let filteredItems = data.filter(
      (item) => filter === "All" || formatStatus(item.status) === filter
    );

    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredItems;
  }, [data, filter, sortConfig]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const requestSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  }, []);

  const getSortIndicator = useCallback((key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  }, [sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const toggleMenu = useCallback((index, e) => {
    e.stopPropagation();
    setActiveMenu(prev => prev === index ? null : index);
  }, []);

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (activeMenu !== null && !e.target.closest('.action-menu-container')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    return () => document.removeEventListener('click', closeMenuOnOutsideClick);
  }, [activeMenu]);

  const handleEdit = useCallback((item) => {
    setEditItem({...item, id: item.id || Math.random().toString(36).substr(2, 9)});
    setActiveMenu(null);
  }, []);

  const handleEditChange = useCallback((field, value) => {
    setEditItem(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editItem) return;
    
    const updatedData = [...data];
    const index = updatedData.findIndex(item => item.id === editItem.id);
    
    if (index !== -1) {
      updatedData[index] = editItem;
    } else {
      updatedData.push({
        ...editItem,
        id: editItem.id || Math.random().toString(36).substr(2, 9)
      });
    }
    
    setData(updatedData);
    onEdit?.(editItem);
    modal.showModal("Changes saved successfully!", "success");
    setEditItem(null);
  }, [editItem, data, onEdit, modal]);

  const handleDelete = useCallback((item) => {
    modal.showModal(
      "Are you sure you want to delete this record?",
      "error",
      () => {
        const updatedData = data.filter(d => d.id !== item.id);
        setData(updatedData);
        onDelete?.(item);
        modal.showModal("Record deleted successfully!", "success");
      }
    );
  }, [data, onDelete, modal]);

  const renderPaginationButtons = useCallback(() => {
    const pageNumbers = [];
    
    pageNumbers.push(
      <button 
        key="previous" 
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        className="pagination-button pagination-nav"
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );
    
    pageNumbers.push(
      <button 
        key={1} 
        onClick={() => setCurrentPage(1)}
        className={`pagination-button ${currentPage === 1 ? 'pagination-active' : ''}`}
      >
        1
      </button>
    );
    
    if (totalPages > 5) {
      if (currentPage > 3) {
        pageNumbers.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button 
            key={i} 
            onClick={() => setCurrentPage(i)}
            className={`pagination-button ${currentPage === i ? 'pagination-active' : ''}`}
          >
            {i}
          </button>
        );
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
    } else {
      for (let i = 2; i < totalPages; i++) {
        pageNumbers.push(
          <button 
            key={i} 
            onClick={() => setCurrentPage(i)}
            className={`pagination-button ${currentPage === i ? 'pagination-active' : ''}`}
          >
            {i}
          </button>
        );
      }
    }
    
    if (totalPages > 1) {
      pageNumbers.push(
        <button 
          key={totalPages} 
          onClick={() => setCurrentPage(totalPages)}
          className={`pagination-button ${currentPage === totalPages ? 'pagination-active' : ''}`}
        >
          {totalPages}
        </button>
      );
    }
    
    pageNumbers.push(
      <button 
        key="next" 
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
        className="pagination-button pagination-nav"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );
    
    return pageNumbers;
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <div className="datatable">
        <div className="datatable-loader">
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="datatable">
        <div className="datatable-empty">
          <h3>{emptyMessage}</h3>
          <p>{emptySubMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="datatable">
      {editItem && (
        <div className="datatable-edit-form">
          <h3>{editFormTitle}</h3>
          {editFormFields.map((field) => (
            <div key={field.name} className="form-row">
              <label>{field.label}:</label>
              {field.type === 'select' ? (
                <select 
                  value={editItem[field.name]} 
                  onChange={(e) => handleEditChange(field.name, field.parseValue ? field.parseValue(e.target.value) : e.target.value)}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type || 'text'} 
                  value={editItem[field.name]} 
                  onChange={(e) => handleEditChange(field.name, field.parseValue ? field.parseValue(e.target.value) : e.target.value)} 
                />
              )}
            </div>
          ))}
          <div className="form-actions">
            <button onClick={handleSaveEdit} className="form-button save">
              Save
            </button>
            <button onClick={() => setEditItem(null)} className="form-button cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            {filters.map((filterOption) => (
              <th 
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)} 
                className={filter === filterOption.value ? "datatable--filter-active" : ""}
              >
                {filterOption.label}
              </th>
            ))}
            {Array(columns.length - filters.length).fill(null).map((_, i) => (
              <th key={`empty-${i}`}></th>
            ))}
          </tr>
          <tr className="datatable--header">
            {columns.map((column) => (
              <th 
                key={column.key}
                onClick={() => column.sortable !== false && requestSort(column.key)}
                style={{ cursor: column.sortable !== false ? 'pointer' : 'default' }}
              >
                {column.label} {column.sortable !== false && getSortIndicator(column.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id || index} className="datatable--items">
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              <td>
                <div className="action-menu-container">
                  <button 
                    className="action-menu-button"
                    onClick={(e) => toggleMenu(index, e)}
                    aria-label="Dropdown Menu"
                  >
                    <div className="action-menu-dots">
                      <div className="action-menu-dot"></div>
                      <div className="action-menu-dot"></div>
                      <div className="action-menu-dot"></div>
                    </div>
                  </button>
                  
                  {activeMenu === index && (
                    <div className="action-menu">
                      <div 
                        className="action-menu-item"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </div>
                      <div 
                        className="action-menu-item delete"
                        onClick={() => handleDelete(item)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="datatable-pagination">
          {renderPaginationButtons()}
        </div>
      )}
    </div>
  );
} 