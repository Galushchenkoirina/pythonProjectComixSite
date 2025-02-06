import React from 'react';
import Login from './Login';
import Register from './Register';
import './index.css';



const Modal = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {type === 'login' ? (
                    <Login onClose={onClose} /> // Передаем onClose в Login
                ) : (
                    <Register onClose={onClose} /> // Передаем onClose в Register
                )}
            </div>
        </div>
    );
};

export default Modal;
