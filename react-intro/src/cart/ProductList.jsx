import React from 'react';
import { useCart } from './CartContext';

const ProductList = () => {
    const { cart, updateQuantity, removeFromCart } = useCart(); // Исправлено: используем cart вместо cartItems

    // Функция для подсчета итоговой суммы
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h2>Корзина</h2>
            {cart.length === 0 ? ( // Проверяем длину cart
                <p>Корзина пуста</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Товар</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Итого</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => ( // Используем cart для отображения товаров
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                    {item.quantity}
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </td>
                                <td>{item.price} Br</td>
                                <td>{(item.price * item.quantity).toFixed(2)} Br</td>
                                <td>
                                    <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h3>Итого: {calculateTotal()} Br</h3>
        </div>
    );
};

export default ProductList;






