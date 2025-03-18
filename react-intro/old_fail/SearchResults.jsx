import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query'); // Получаем поисковый запрос из URL

    // Здесь вы можете добавить логику для получения результатов поиска на основе searchQuery
    const results = []; // Замените это на логику для получения результатов

    return (
        <div>
            <h1>Результаты поиска для: "{searchQuery}"</h1>
            <div className="search-results">
                {results.length > 0 ? (
                    results.map((item) => (
                        <div key={item.id} className="search-item">
                            <h2>{item.name}</h2>
                            {/* Другие детали товара */}
                        </div>
                    ))
                ) : (
                    <p>Нет результатов для вашего запроса.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
