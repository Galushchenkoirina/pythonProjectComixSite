import React, { createContext, useState, useContext } from 'react';


// Создаем контекст корзины
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        setCart((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Если товар уже есть в корзине, увеличиваем количество
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Если товара нет в корзине, добавляем его с количеством 1
            return [...prevItems, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
        });
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (id) => {
        setCart((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Функция для обновления количества товара
    const updateQuantity = (id, quantity) => {
        setCart((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Функция для очистки корзины
    const clearCart = () => {
        setCart([]);
    };

    // Подсчет общего количества товаров в корзине
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Возвращаем контекст с необходимыми данными и функциями
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Хук для использования контекста корзины в компонентах
const useCart = () => {
    return useContext(CartContext);
};

export { CartProvider, useCart };