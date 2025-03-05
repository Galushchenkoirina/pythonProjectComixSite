import React from 'react';
import { useCart } from './CartContext';

const ProductList = () => {
    const { cartItems } = useCart(); // Получаем товары из корзины

    return (
        <div>
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <div>{item.title} - {item.quantity} шт. - {item.price} Br</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;







// import React, { useEffect, useState } from 'react';
// import { useCart } from './CartContext';
//
// const ProductList = () => {
//     const { addToCart } = useCart();
//     const [products, setProducts] = useState([]); // Состояние для хранения товаров
//     const [loading, setLoading] = useState(true); // Состояние загрузки
//     const [error, setError] = useState(null); // Состояние для ошибок
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/products'); // Замените на ваш API URL
//                 if (!response.ok) {
//                     throw new Error('Ошибка при загрузке данных');
//                 }
//                 const data = await response.json();
//                 setProducts(data); // Установите загруженные товары в состояние
//             } catch (err) {
//                 setError(err.message); // Установите сообщение об ошибке
//             } finally {
//                 setLoading(false); // Установите состояние загрузки в false
//             }
//         };
//
//         fetchProducts();
//     }, []); // Пустой массив зависимостей, чтобы выполнить эффект только один раз при монтировании
//
//     // Если данные загружаются, покажите индикатор загрузки
//     if (loading) {
//         return <p>Загрузка товаров...</p>;
//     }
//
//     // Если произошла ошибка, покажите сообщение об ошибке
//     if (error) {
//         return <p>Ошибка: {error}</p>;
//     }
//
//     return (
//         <div className="product-list">
//             {products.map(product => (
//                 <div key={product.id}>
//                     <h3>{product.name}</h3>
//                     <p>Цена: {product.price}₽</p>
//                     <button onClick={() => addToCart(product)}>Добавить в корзину</button>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default ProductList;
