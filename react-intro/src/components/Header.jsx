import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Header = ({ openModal, isModalOpen, closeModal, modalType }) => {
    return (
        <header className="header">
            <div className="container">
                <nav className="menu">
                    <ul>
                        <li><Link to="/">comix.by</Link></li>
                        <li><a href="#">Доставка</a></li>
                        <li><a href="#">Оплата</a></li>
                        <li><a href="#">Контакты</a></li>
                        <li><Link to="/login">Aвторизация</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/logout">Выйти</Link></li>
                    </ul>
                </nav>
                <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
                <a href="tel:375297777777" className="phone">+375 29 777 77 77</a>
            </div>
        </header>
    );
};

export default Header;
