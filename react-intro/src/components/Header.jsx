import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import CartButton from './CartButton';
import { useAuth } from './AuthContext';
import CartContext, {useCart} from '../cart/CartContext';
import './LogReg.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ onSearch }) => {
    const { cartQuantity, setCartQuantity } = useCart(); // Состояние для количества товаров в корзине
    const { username, isAuthenticated } = useAuth(); // Получаем имя пользователя и статус аутентификации

    // Функция для обновления количества товаров в корзине
    const updateCartQuantity = (newQuantity) => {
        setCartQuantity(newQuantity);
    };

    // Пример функции для добавления товара в корзину
    const addToCart = (item) => {
        // Логика добавления товара в корзину
        updateCartQuantity(cartQuantity + 1); // Увеличиваем количество на 1
    };

    return (
        <header className="header">
            <div className="global">
                <nav className="global-menu">
                    <ul>
                        {isAuthenticated ? ( // Проверяем, аутентифицирован ли пользователь
                            <h1>Привет, {username}!</h1> // Отображаем имя пользователя
                        ) : (
                            <li><Link to="#">Зарегистрируйтесь</Link></li>
                        )}
                        <li><SearchBar onSearch={onSearch} /></li>
                        <li style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/product-list" className="cart-button" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <i className="fas fa-shopping-cart" style={{ fontSize: '24px' }}></i>
                                {cartQuantity > 0 && (
                                    <span style={{ marginLeft: '8px', fontWeight: 'bold', color: 'red' }}>{cartQuantity}</span>
                                )}
                            </Link>
                        </li>
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
                        {!isAuthenticated ? ( // Показать ссылки на авторизацию и регистрацию, если пользователь не аутентифицирован
                            <>
                                <li><Link to="/login">Aвторизация</Link></li>
                                <li><Link to="/register">Регистрация</Link></li>
                            </>
                        ) : (
                            <li><Link to="/logout">Выйти</Link></li> // Ссылка на выход, если пользователь аутентифицирован
                        )}
                    </ul>
                </nav>
                <a href="tel:375297777777" className="phone">+375 29 777 77 77</a>
            </div>
        </header>
    );
};

export default Header;