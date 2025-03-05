import React from 'react';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} COMIX.BY</p>
                <ul className="footer-links">
                    <li><a href="/about">Корзина</a></li>
                    <li><a href="/contact">Оформить заказ</a></li>
                    <li><a href="/privacy">Магазин</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;