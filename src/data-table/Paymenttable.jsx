/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from "react";
import { formatStatus, formatAmount, formatType } from "../components/Utils";
import "./tables.css";
import { useToast } from "../components/ToastProvider";

export default function Paymenttable({ payments: initialPayments = [], isLoading = false }) {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const toast = useToast();

  // Prop değişikliklerini takip et
  useEffect(() => {
    setPayments(initialPayments);
  }, [initialPayments]);

  // Filtreleme ve sıralama işlevleri
  const filteredAndSortedPayments = useMemo(() => {
    let filteredItems = payments.filter(
      (payment) => filter === "All" || formatStatus(payment.status) === filter
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
  }, [payments, filter, sortConfig]);

  // Sayfalama için mevcut sayfadaki öğeleri hesaplama
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedPayments.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedPayments, currentPage, itemsPerPage]);

  // Sıralama fonksiyonu
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sıralama ikon gösterimi için yardımcı fonksiyon
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  // Sayfalama için sayfa sayısı hesaplama
  const totalPages = Math.ceil(filteredAndSortedPayments.length / itemsPerPage);

  // Sayfalama düğmelerini oluşturma
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    
    // Önceki sayfa düğmesi
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
    
    // İlk sayfa
    pageNumbers.push(
      <button 
        key={1} 
        onClick={() => setCurrentPage(1)}
        className={`pagination-button ${currentPage === 1 ? 'pagination-active' : ''}`}
      >
        1
      </button>
    );
    
    // Orta sayfalar
    if (totalPages > 5) {
      if (currentPage > 3) {
        pageNumbers.push(
          <span key="ellipsis1" className="pagination-ellipsis">...</span>
        );
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
        pageNumbers.push(
          <span key="ellipsis2" className="pagination-ellipsis">...</span>
        );
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
    
    // Son sayfa (sadece 1'den fazla sayfa varsa)
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
    
    // Sonraki sayfa düğmesi
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
  };

  // Menüleri yönetme
  const toggleMenu = (index, e) => {
    e.stopPropagation(); // Tıklamanın dışarı yayılmasını engelle
    setActiveMenu(activeMenu === index ? null : index);
  };

  // Menüyü dışarı tıklandığında kapatmak için 
  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (activeMenu !== null && !e.target.closest('.action-menu-container')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, [activeMenu]);

  // Düzenleme işlemi
  const handleEdit = (payment) => {
    setEditItem({...payment, id: payment.id || Math.random().toString(36).substr(2, 9)});
    setActiveMenu(null);
  };

  // Düzenleme formunu güncelleme
  const handleEditChange = (field, value) => {
    setEditItem({
      ...editItem,
      [field]: value
    });
  };

  // Düzenlemeyi kaydetme
  const handleSaveEdit = () => {
    if (!editItem) return;
    
    // İçerideki payment array'ini güncelle
    const updatedPayments = [...payments];
    const index = updatedPayments.findIndex(p => p.id === editItem.id);
    
    if (index !== -1) {
      // Mevcut ödemeyi güncelle
      updatedPayments[index] = editItem;
    } else {
      // Yeni ödeme ekle (id yoksa)
      updatedPayments.push({
        ...editItem,
        id: editItem.id || Math.random().toString(36).substr(2, 9)
      });
    }
    
    // State'i güncelle
    setPayments(updatedPayments);
    
    // Kullanıcıya bildir
    toast.showToast("Changes saved!", "success");
    
    // Düzenleme modundan çık
    setEditItem(null);
  };

  // Düzenlemeyi iptal etme
  const handleCancelEdit = () => {
    setEditItem(null);
  };

  if (isLoading) {
    return (
      <div className="datatable">
        <div className="datatable-loader">
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="datatable">
        <div className="datatable-empty">
          <h3>No Payment Records Yet</h3>
          <p>Please create a new record to add payment entries.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="datatable">
      {editItem && (
        <div className="datatable-edit-form">
          <h3>Edit Payment Record</h3>
          <div className="form-row">
            <label>Date:</label>
            <input 
              type="date" 
              value={editItem.date} 
              onChange={(e) => handleEditChange('date', e.target.value)} 
            />
          </div>
          <div className="form-row">
            <label>Payment Detail:</label>
            <input 
              type="text" 
              value={editItem.paymentDetail} 
              onChange={(e) => handleEditChange('paymentDetail', e.target.value)} 
            />
          </div>
          <div className="form-row">
            <label>Payment Type:</label>
            <select 
              value={editItem.paymentType} 
              onChange={(e) => handleEditChange('paymentType', parseInt(e.target.value))}
            >
              <option value={1}>Cash</option>
              <option value={2}>Credit Card</option>
              <option value={3}>Bank Transfer</option>
              <option value={4}>Other</option>
            </select>
          </div>
          <div className="form-row">
            <label>Amount:</label>
            <input 
              type="number" 
              value={editItem.amount} 
              onChange={(e) => handleEditChange('amount', parseFloat(e.target.value))} 
            />
          </div>
          <div className="form-row">
            <label>Status:</label>
            <select 
              value={editItem.status} 
              onChange={(e) => handleEditChange('status', parseInt(e.target.value))}
            >
              <option value={1}>Paid</option>
              <option value={2}>Unpaid</option>
            </select>
          </div>
          <div className="form-actions">
            <button onClick={handleSaveEdit} className="form-button save">
              Save
            </button>
            <button onClick={handleCancelEdit} className="form-button cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            <th 
              onClick={() => setFilter("All")} 
              className={filter === "All" ? "datatable--filter-active" : ""}
            >
              All
            </th>
            <th 
              onClick={() => setFilter("Paid")} 
              className={filter === "Paid" ? "datatable--filter-active" : ""}
            >
              Paid
            </th>
            <th 
              onClick={() => setFilter("Unpaid")} 
              className={filter === "Unpaid" ? "datatable--filter-active" : ""}
            >
              Unpaid
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className="datatable--header">
            <th onClick={() => requestSort('date')}>DATE {getSortIndicator('date')}</th>
            <th onClick={() => requestSort('paymentDetail')}>PAYMENT DETAIL {getSortIndicator('paymentDetail')}</th>
            <th onClick={() => requestSort('paymentType')}>PAYMENT TYPE {getSortIndicator('paymentType')}</th>
            <th onClick={() => requestSort('amount')}>AMOUNT {getSortIndicator('amount')}</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((payment, index) => (
            <tr key={index} className="datatable--items">
              <td>{payment.date}</td>
              <td>{payment.paymentDetail}</td>
              <td>
                <span className="type-badge">
                  {formatType(payment.paymentType)}
                </span>
              </td>
              <td>
                <span className="amount">${formatAmount(payment.amount)}</span>
              </td>
              <td>
                <span className={`status-badge ${payment.status === 1 ? 'status-paid' : 'status-unpaid'}`}>
                  {formatStatus(payment.status)}
                </span>
              </td>
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
                        onClick={() => handleEdit(payment)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </div>
                      <div className="action-menu-item delete">
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
