import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(query)}`); // Перенаправляем на страницу результатов
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Поиск..."
            />
            <button type="submit">Найти</button>
        </form>
    );
};

export default SearchBar;