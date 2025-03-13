import React from "react";
import "./styles.css"; 

export const Modal = ({ isOpen, onClose, onCancel ,title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
            {
                onConfirm && (
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Confirmar
                    </button>
                )
            }
            {
                onCancel && (
                    <button className="btn btn-danger" onClick={onCancel}>
                        Cancelar
                    </button>
                )
            }
        </div>
      </div>
    </div>
  );
};
