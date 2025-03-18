import React, { useState, useEffect } from 'react';
import SearchBar from '../src/components/SearchBar'; // Импортируй компонент поиска

const SearchList = () => {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`http://localhost:8000/api/?search=${searchQuery}`);
            const data = await response.json();
            setImages(data);
        };

        fetchImages();
    }, [searchQuery]);

    return (
        <div>
            <SearchBar onSearch={setSearchQuery} />
            <ul>
                {images.map(image => (
                    <li key={image.id}>{image.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchList;
