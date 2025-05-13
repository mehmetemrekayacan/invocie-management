import React, { createContext, useContext, useState, useCallback } from "react";
import Modal from "./Toast";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const showModal = useCallback((message, type = "info", onConfirm) => {
    setModal({ message, type, onConfirm });
  }, []);

  const handleClose = useCallback(() => {
    setModal(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (modal?.onConfirm) {
      modal.onConfirm();
    }
    handleClose();
  }, [modal, handleClose]);

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modal && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={handleClose}
          onConfirm={modal.onConfirm ? handleConfirm : undefined}
        />
      )}
    </ModalContext.Provider>
  );
} 