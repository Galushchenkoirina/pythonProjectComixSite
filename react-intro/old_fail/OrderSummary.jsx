// src/OrderSummary.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
    // Получаем данные из состояния маршрута
    const location = useLocation();
    const { formData, cartItems } = location.state || { formData: {}, cartItems: [] };

    return (
        <div>
            <h2>Подтверждение заказа</h2>
            <h3>Данные клиента:</h3>
            <p><strong>Имя:</strong> {formData.name}</p>
            <p><strong>Адрес:</strong> {formData.address}</p>
            <p><strong>Телефон:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Способ оплаты:</strong> {formData.payment_method}</p>

            <h3>Содержимое корзины:</h3>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} - {item.price}₽</li>
                    ))}
                </ul>
            ) : (
                <p>Корзина пуста</p>
            )}

            <button onClick={() => alert('Заказ оформлен!')}>Оформить заказ</button>
        </div>
    );
};

export default OrderSummary;