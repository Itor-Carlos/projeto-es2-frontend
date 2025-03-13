import React, { useEffect } from "react";
import "./styles.css";

export const Toast = ({ isOpen, onClose, message, type = "success", duration = 3000 }) => {
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
};
