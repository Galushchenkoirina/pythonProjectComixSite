import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './cart/CartContext';

const ImageDetail = () => {
    const { id } = useParams(); // Получаем ID из параметров маршрута
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`/api/${id}`); // Используем относительный путь
                setImage(response.data);
            } catch (error) {
                setError('Ошибка загрузки изображения');
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    if (loading) return <p>Загрузка изображения...</p>;
    if (error) return <p>{error}</p>;

    const handleAddToCart = (image) => {
        addToCart(image); // Добавляем товар в корзину
        alert(`${image.title} добавлен в корзину!`); // Уведомление пользователя
    };

    return (
        <div>
            {image ? (
                <>
                    <h1>{image.title}</h1>
                    <img src={image.link} alt={image.imag} style={{ width: '300px', textAlign: 'center' }} />
                     <button className="buy-button" style={{ margin: '50px'}} onClick={() => handleAddToCart(image)}>Купить</button>
                     <p style={{ color: 'red', fontWeight: 'bold'}}>Цена: {image.price} Br</p>
                    <p style={{ width: '100%'}}>{image.description}</p>
                </>
            ) : (
                <p>Изображение не найдено.</p>
            )}
        </div>
    );
};

export default ImageDetail;




