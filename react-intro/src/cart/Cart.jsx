import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart, clearCart } = useCart(); // Предполагается, что у вас есть функция clearCart для очистки корзины
    const [products, setProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0); // Состояние для общей стоимости

    // Получение списка продуктов
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        fetchProducts();
    }, []);

    // Функция для расчета общей стоимости корзины
    const calculateTotalCost = () => {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalCost(total);
    };

    // Обновление общей стоимости при изменении корзины
    useEffect(() => {
        calculateTotalCost();
    }, [cart]);

    // Функция для оформления заказа
    const handleCheckout = async () => {
        const orderData = {
            items: cart.map(item => ({
                product_id: item.id, // Используйте product_id вместо id
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            })),
            total: totalCost, // Используйте сохраненную общую стоимость
        };

        try {
            const response = await fetch('http://localhost:8000/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при оформлении заказа');
            }

            const data = await response.json();
            console.log('Заказ оформлен успешно:', data);
            clearCart(); // Очистка корзины после успешного оформления заказа
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
        }
    };

    // Проверка на наличие элементов в корзине
    if (!cart || cart.length === 0) {
        return <div>Ваша корзина пуста. Добавьте товары для оформления заказа.</div>;
    }

    return (
        <div>
            <h2>Корзина</h2>
            {cart.map((item) => (
                <div key={item.id}>
                    {item.title} - {item.price}₽ (Количество: {item.quantity})
                </div>
            ))}
            <button onClick={handleCheckout}>Оформить заказ</button>
            <h3>Общая стоимость корзины: {totalCost} ₽</h3>
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Cart;










