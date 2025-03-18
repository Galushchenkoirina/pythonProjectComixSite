import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/');
                setImages(response.data);
            } catch (error) {
                setError('Ошибка загрузки изображений');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <p>Загрузка изображений...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {images.map((image, index) => (
                <div key={index}>
                    <Link to={`/image/${index}`}>
                        <h1>{image.imag}</h1>
                        <img src={image.link} alt={image.imag} style={{ width: '100px', height: 'auto' }} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ImageList;
