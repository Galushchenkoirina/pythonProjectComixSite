import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} COMIX.BY</p>
                <ul className="footer-links">
                    <li><a href="#">Корзина</a></li>
                    <li><Link to="/checkout">Оформить заказ</Link></li>
                    <li><a href="#">Магазин</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;


