import React, { useState, useEffect } from 'react';
import Cart from '../src/cart/Cart';
import OrderForm from './OrderForm';

const OrderComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Имитация получения данных о товарах из API
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/'); // Замените на ваш API
            const data = await response.json();
            const itemsWithQuantity = data.map(item => ({ ...item, quantity: 1 }));
            setCartItems(itemsWithQuantity);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleUpdateQuantity = (id, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleOrderSubmit = (orderData) => {
        const orderDetails = {
            ...orderData,
            items: cartItems,
            total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        };
        console.log('Данные заказа:', orderDetails);
        // Здесь можно отправить данные на сервер или выполнить другую логику
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
            <OrderForm onSubmit={handleOrderSubmit} />
        </div>
    );
};

export default OrderComponent;
