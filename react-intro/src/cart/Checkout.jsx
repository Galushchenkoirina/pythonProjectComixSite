import React, {useState} from 'react';
import {useCart} from './CartContext';
import './ProductList.css';

const Checkout = () => {
    const {cart, clearCart} = useCart();
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        payment_method: '',
        delivery_method: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCustomerData({...customerData, [name]: value});
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart || cart.length === 0) {
            console.error('Корзина пуста. Не удается оформить заказ.');
            return;
        }

        if (!customerData.name || !customerData.email || !customerData.address || !customerData.phone) {
            console.error('Ошибка: все поля клиента должны быть заполнены.');
            return;
        }

        const items = cart.map(item => {
            if (!item.price || !item.quantity || !item.title) {
                console.error('Ошибка: цена, количество или название товара отсутствует.', item);
                return null;
            }
            return {
                title: item.title,
                quantity: item.quantity,
                price: item.price
            };
        }).filter(item => item !== null);

        if (items.length === 0) {
            console.error('Ошибка: нет корректных товаров для оформления заказа.');
            return;
        }

        const orderData = {
            ...customerData,
            items: items,
            total: calculateTotal(),
        };

        console.log('Данные заказа:', orderData);

        try {
            const response = await fetch('http://localhost:8000/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            console.log('Ответ от сервера:', data);

            if (response.ok) {
                console.log('Успех:', data);
                clearCart();
                // Уведомление об успешном заказе
            } else {
                console.error('Ошибка при оформлении заказа:', data);
                // Можно добавить уведомление об ошибке
            }
        } catch (error) {
            console.error('Ошибка:', error);
            // Можно добавить уведомление об ошибке
        }
    };

    // Проверяем, пуста ли корзина
    if (!cart || cart.length === 0) {
        return <p>Спасибо за заказ, мы свяжемся с Вами.</p>;
    }
    return (
        <div className="order-form">
            <h2>Оформление заказа</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Имя:
                        <input type="text" name="name" value={customerData.name} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={customerData.email} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Адрес:
                        <input type="text" name="address" value={customerData.address} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Телефон:
                        <input type="tel" name="phone" value={customerData.phone} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Способ оплаты:
                        <select name="payment_method" value={customerData.payment_method} onChange={handleChange} required>
                            <option value="" disabled>Выберите способ оплаты</option>
                            <option value="credit_card">Кредитная карта</option>
                            <option value="cash">Наличные</option>
                            <option value="cash_on_delivery">Наложенный платеж</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Способ доставки:
                        <select name="delivery_method" value={customerData.delivery_method} onChange={handleChange} required>
                            <option value="" disabled>Выберите способ доставки</option>
                            <option value="pickup">Самовывоз</option>
                            <option value="courier">Доставка курьером</option>
                            <option value="post">Почта</option>
                            <option value="europost">Европочта</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Подтвердить заказ</button>
            </form>
            <h3>Итого: {calculateTotal()}</h3>
        </div>
    );
};

export default Checkout;
