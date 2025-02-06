// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const ImageDetail = () => {
//     const [images, setImages] = useState([]); // Массив для хранения всех изображений
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//     const fetchImages = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/');
//             console.log(response.data); // Логируем данные, полученные от API
//             if (response.data && response.data.length > 0) {
//                 setImages(response.data); // Сохраняем все изображения в состоянии
//             } else {
//                 setError('Изображения не найдены.');
//             }
//         } catch (error) {
//             setError('Ошибка загрузки изображений');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//         fetchImages();
//     }, []);
//
//     if (loading) {
//         return <p>Загрузка изображений...</p>;
//     }
//
//     if (error) {
//         return <p>{error}</p>;
//     }
//
//     return (
//         <div>
//             {images.map((image, index) => (
//                 <div key={index}>
//                     <h1>{image.title}</h1> {/* Название из поля imag */}
//                     <img src={image.link} alt={image.imag} style={{ width: '300px', height: 'auto' }} />
//                     <p>{image.description}</p> {/* Описание */}
//                     <p>Цена: {image.price}</p> {/* Цена */}
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default ImageDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImageDetail = () => {
    const { id } = useParams(); // Получаем ID из параметров маршрута
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div>
            {image ? (
                <>
                    <h1>{image.title}</h1>
                    <img src={image.link} alt={image.imag} style={{ width: '300px', height: 'auto' }} />
                    <p style={{ width: '300px', height: 'auto'}}>{image.description}</p>
                    <p>Цена: {image.price}</p>
                </>
            ) : (
                <p>Изображение не найдено.</p>
            )}
        </div>
    );
};

export default ImageDetail;




