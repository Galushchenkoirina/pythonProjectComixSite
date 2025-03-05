import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.price}₽
                            <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Всего товаров: {cartItems.length}</p>
        </div>
    );
};

export default Cart;