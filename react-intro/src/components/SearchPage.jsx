import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useCart} from "../cart/CartContext";
import './LogReg.css';

const SearchPage = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`http://localhost:8000/api/`);
            const data = await response.json();
            setImages(data);
            console.log("Все изображения:", data); // Логируем все изображения
        };

        fetchImages();
    }, []);

    useEffect(() => {
        console.log("Поисковый запрос:", searchQuery); // Логируем поисковый запрос
        if (searchQuery) {
            const results = images.filter(image =>
                image.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredImages(results);
            console.log("Отфильтрованные изображения:", results); // Логируем отфильтрованные изображения
        } else {
            setFilteredImages(images);
        }
    }, [searchQuery, images]);

    const handleAddToCart = (image) => {
        addToCart(image); // Добавляем товар в корзину
        alert(`${image.title} добавлен в корзину!`); // Уведомление пользователя
    };

    return (
        <div>
            <h1>Результаты поиска для: "{searchQuery}"</h1>

            <div className="search-results">
                {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                        <div key={image.id} className="search-item"
                             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px', flex: '0 0 calc(25%)'}}>
                            <Link to={`/image/${image.id}`} style={{textDecoration: 'none', color: 'black', width: '200px', flex: '0 0 calc(25%)'
                            }}>
                                <img
                                    src={image.link}
                                    alt={`Изображение ${image.id}`}
                                    style={{width: '200px', height: 'auto'}} // Задаем ширину 100% для изображения
                                />
                                <div style={{textAlign: 'center', color: 'blue', fontWeight: 'bold'}}>{image.title}</div>
                                <div style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{image.price} Br</div>
                            </Link>
                            <button className="buy-button" onClick={() => handleAddToCart(image)}>Купить</button>
                        </div>
                    ))
                ) : (
                    <p>Нет результатов для вашего запроса.</p>
                )}
            </div>
        </div>

    )
        ;
};

export default SearchPage;