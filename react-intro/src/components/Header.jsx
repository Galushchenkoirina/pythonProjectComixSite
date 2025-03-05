import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Импортируйте компонент поиска
import './LogReg.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ openModal, isModalOpen, closeModal, modalType, onSearch }) => {
    return (
        <header className="header">
            <div className="global">
                <nav className="global-menu">
                    <ul>
                        <li><Link to="#">Приветствие</Link></li>
                        <li><SearchBar onSearch={onSearch}/></li>
                        <Link to="/product-list" className="cart-button"><i className="fas fa-shopping-cart"></i></Link>
                    </ul>
                </nav>
            </div>
            <div className="container">
                <nav className="menu">
                    <ul>
                        <li><Link to="/">comix.by</Link></li>
                        <li><a href="/delivery">Доставка</a></li>
                        <li><a href="/payment">Оплата</a></li>
                        <li><a href="/touch">Контакты</a></li>
                        <li><Link to="/login">Aвторизация</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/logout">Выйти</Link></li>
                    </ul>
                </nav>
                <a href="tel:375297777777" className="phone">+375 29 777 77 77</a>
            </div>
        </header>
    );
};

export default Header;
