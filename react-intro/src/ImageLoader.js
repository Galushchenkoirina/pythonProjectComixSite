import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const ImageLoader = ({ selectedCategory }) => {
    const [images, setImages] = useState([]); // Массив для хранения всех изображений
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/');
                if (response.data && response.data.length > 0) {
                    setImages(response.data); // Сохраняем все изображения в состоянии
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

    // Фильтрация изображений на основе выбранной категории
    const filteredImages = images.filter(image => {
        if (selectedCategory === 'all') return true; // Отображать все изображения

        // Если категория "other", показываем все, что не попадает в другие категории
        if (selectedCategory === 'other') {
            return !['kniga', 'komiks', 'manga', 'ranobe', 'entsiklopediya'].some(cat => image.link.includes(cat));
        }

        // Проверяем, содержит ли ссылка выбранную категорию
        return image.link.includes(selectedCategory);
    });

    if (loading) {
        return <p>Загрузка изображений...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="all-book" style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                    <div className="image-item" key={image.id}
                         style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                        <img
                            src={image.link}
                            alt={`Изображение ${image.id}`}
                            style={{ width: '200px', height: 'auto' }} // Задаем ширину 100% для изображения
                        />
                        <Link to={`/image/${image.id}`} style={{ textDecoration: 'none', color: 'black', width: '200px' }}>
                            <div style={{ textAlign: 'center' }}>{image.title}</div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>Изображения не найдены.</p>
            )}
        </div>
    );
};

export default ImageLoader;



