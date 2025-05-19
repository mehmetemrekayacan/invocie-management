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
  editFormTitle = "Edit Record",
  luxuryMode = false
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

  // Boş durum gösterimi için daha modern bir tasarım
  const EmptyState = ({ message, subMessage }) => (
    <div className="datatable-empty">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 16px' }}>
        <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor" opacity="0.2"/>
        <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor" opacity="0.5"/>
      </svg>
      <h3>{message}</h3>
      <p>{subMessage}</p>
    </div>
  );

  // Yükleme durumu için daha modern bir tasarım
  const LoadingState = () => (
    <div className="datatable-loader">
      <div className="loader-spinner"></div>
      <div className="loader-text">Yükleniyor...</div>
    </div>
  );

  // Pagination bileşeninde daha detaylı bilgi gösterimi
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // ... existing code ...
    
    return (
      <div className="datatable-pagination">
        <div className="pagination-info">
          Sayfa {currentPage} / {totalPages}
        </div>
        <div className="pagination-controls">
          {/* Navigation buttons */}
          <button
            className="pagination-button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>
          
          {/* Page buttons */}
          {renderPaginationButtons()}
          
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
          <button
            className="pagination-button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="datatable">
        <LoadingState />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="datatable">
        <EmptyState message={emptyMessage} subMessage={emptySubMessage} />
      </div>
    );
  }

  return (
    <div className={`datatable ${luxuryMode ? 'luxury-mode' : ''}`}>
      {editItem && editFormFields && (
        <div className={`datatable-edit-form ${luxuryMode ? 'luxury-edit-form' : ''}`}>
          <h3>{editFormTitle}</h3>
          {editFormFields.map((field) => (
            <div className="form-row" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select 
                  id={field.name}
                  value={editItem[field.name]} 
                  onChange={(e) => {
                    const value = field.parseValue 
                      ? field.parseValue(e.target.value)
                      : e.target.value;
                    handleEditChange(field.name, value);
                  }}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type={field.type}
                  id={field.name}
                  value={editItem[field.name]} 
                  onChange={(e) => {
                    const value = field.parseValue && field.type === 'number'
                      ? field.parseValue(e.target.value)
                      : e.target.value;
                    handleEditChange(field.name, value);
                  }}
                />
              )}
            </div>
          ))}
          <div className="form-actions">
            <button 
              type="button" 
              className="form-button cancel"
              onClick={() => setEditItem(null)}
            >
              İptal
            </button>
            <button 
              type="button" 
              className="form-button save"
              onClick={handleSaveEdit}
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      {!editItem && (
        <>
          {filters && (
      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
                  {filters.map((filterItem, index) => (
              <th 
                      key={index}
                      className={filter === filterItem.value ? 'datatable--filter-active' : ''}
                      onClick={() => setFilter(filterItem.value)}
              >
                      {filterItem.label}
              </th>
            ))}
          </tr>
              </thead>
            </table>
          )}

          {isLoading ? (
            <LoadingState />
          ) : filteredAndSortedData.length === 0 ? (
            <EmptyState message={emptyMessage} subMessage={emptySubMessage} />
          ) : (
            <>
              <table className="datatable--chart">
                <thead>
          <tr className="datatable--header">
            {columns.map((column) => (
              <th 
                key={column.key}
                        onClick={() => column.sortable && requestSort(column.key)}
                        style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                        data-key={column.key}
              >
                        {column.icon && column.icon}
                  <span className="column-label">{column.label}</span>
                        {column.sortable && <span className="sort-indicator">{getSortIndicator(column.key)}</span>}
              </th>
            ))}
                    <th style={{ width: '60px' }}></th>
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
                        <div className="action-menu-container" style={{ position: 'relative' }}>
                  <button 
                    className="action-menu-button"
                    onClick={(e) => toggleMenu(index, e)}
                  >
                    <div className="action-menu-dots">
                      <div className="action-menu-dot"></div>
                      <div className="action-menu-dot"></div>
                      <div className="action-menu-dot"></div>
                    </div>
                  </button>
                  
                  {activeMenu === index && (
                    <div className="action-menu">
                              <div className="action-menu-item" onClick={() => handleEdit(item)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Düzenle
                      </div>
                              <div className="action-menu-item delete" onClick={() => handleDelete(item)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                Sil
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
                  <div className="pagination-info">
                    Sayfa {currentPage} / {totalPages}
                  </div>
                  <div className="pagination-controls">
                    {renderPaginationButtons()}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
} 