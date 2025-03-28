import './index.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useCart } from './cart/CartContext';

const HomePage = () => {
    const [images, setImages] = useState([]); // Массив для хранения всех изображений
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // Получаем функцию добавления в корзину

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/');
                if (response.data && response.data.length > 0) {
                    // Берем первые 12 изображений
                    setImages(response.data.slice(0, 8));
                } else {
                    setError('Изображения не найдены.');
                }
            } catch (error) {
                setError('Ошибка загрузки изображений');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <p>Загрузка изображений...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleAddToCart = (image) => {
        addToCart(image); // Добавляем товар в корзину
        alert(`${image.title} добавлен в корзину!`); // Уведомление пользователя
    };

    return (
        <div className="all-book" style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <aside className="main-info">
                <ul>
                    <p>Более 100+ комиксов и манги</p>
                    <p>Низкие цены. Нашли дешевле чем у нас? Сделаем еще дешевле!</p>
                    <p>Надежно упакуем. 100% без повреждений!</p>
                    <p>Новинки каждый вторник</p>
                </ul>
            </aside>
            <div className='home-page' style={{ textAlign: 'center', width: '100%' }}>
                <h1>Магазин комиксов в Минске.</h1>
                <h2>Поступления каждую неделю.</h2>
                <h3>Новинки этой недели.</h3>
            </div>
            {images.length > 0 ? (
                images.map((image) => (
                    <div className="image-item" key={image.id}
                         style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                        <Link to={`/image/${image.id}`} style={{ textDecoration: 'none', color: 'black', width: '200px' }}>
                            <img
                                src={image.link}
                                alt={`Изображение ${image.id}`}
                                style={{ width: '200px', height: 'auto' }} // Задаем ширину 100% для изображения
                            />
                            <div style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold' }}>{image.title}</div>
                            <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{image.price} Br</div>
                        </Link>
                        <button className="buy-button" onClick={() => handleAddToCart(image)}>Купить</button>
                    </div>
                ))
            ) : (
                <p>Изображения не найдены.</p>
            )}
        </div>
    );
};

export default HomePage;
