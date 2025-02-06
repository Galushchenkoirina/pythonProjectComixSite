// import React from 'react';
import './index.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const HomePage = () => {
    const [images, setImages] = useState([]); // Массив для хранения всех изображений
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/');
                if (response.data && response.data.length > 0 < 12) {
                    // const shuffledImages = response.data.sort(() => 0.5 - Math.random());
                    // Берем первые 12 изображений
                    setImages(response.data.slice(0, 12));
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



    return (

    <div className="all-book" style={{flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        <aside className="main-info">
                        <ul>
                            <p>Более 100+ комиксов и манги</p>
                            <p>Низкие цены. Нашли дешевле чем у нас? Сделаем еще дешевле!</p>
                            <p>Надежно упакуем. 100% без повреждений!</p>
                            <p>Новинки каждый вторник</p>
                        </ul>
                    </aside>
        <div className='home-page' style={{textAlign: 'center', width: '100%'}}>
            <h1>Магазин комиксов в Минске.</h1>
            <p>Поступления каждую неделю.</p>
        </div>
        {images.length > 0 ? (
            images.map((image) => (


                <div className="image-item" key={image.id}
                     style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px'}}>

                    <img
                        src={image.link}
                        alt={`Изображение ${image.id}`}
                        style={{width: '200px', height: 'auto'}} // Задаем ширину 100% для изображения
                    />
                    <Link to={`/image/${image.id}`} style={{textDecoration: 'none', color: 'black', width: '200px'}}>
                        <div style={{textAlign: 'center'}}>{image.title}</div>
                    </Link>
                </div>
            ))
        ) : (
            <p>Изображения не найдены.</p>
        )}
    </div>

)
    ;
};



export default HomePage;




