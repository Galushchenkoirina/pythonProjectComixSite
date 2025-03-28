import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const { cart, updateQuantity, removeFromCart } = useCart(); // Используем cart вместо cartItems

    // Функция для подсчета итоговой суммы
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Корзина</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">Корзина пуста</p>
            ) : (
                <table className="cart-table">
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
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1} className="quantity-button">-</button>
                                    {item.quantity}
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-button">+</button>
                                </td>
                                <td>{item.price} Br</td>
                                <td>{(item.price * item.quantity).toFixed(2)} Br</td>
                                <td>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h3 className="total-amount">Итого: {calculateTotal()} Br</h3>

            {cart.length > 0 && (
                <div className="checkout-container">
                    <Link to="/checkout" className="checkout-button">
                        Оформить заказ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductList;







