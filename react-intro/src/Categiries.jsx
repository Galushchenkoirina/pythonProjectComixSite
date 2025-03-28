import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
        { key: 'all', label: 'КАТАЛОГ' },
        { key: 'kniga', label: 'Книга' },
        { key: 'komiks', label: 'Комикс' },
        { key: 'manga', label: 'Манга' },
        { key: 'ranobe', label: 'Ранобэ' },
        { key: 'entsiklopediya', label: 'Энциклопедия' },
        { key: 'other', label: 'Другое' }
    ];

    const location = useLocation(); // Получаем текущий маршрут

    // Проверяем, находится ли пользователь на странице с категориями
    const isCategoryPage = location.pathname === '/image'; // Измените на ваш маршрут, где отображаются категории

    return (
        <aside className="book-filter">
            <ul>
                {categories.map(category => (
                    <li key={category.key} className={isCategoryPage && selectedCategory === category.key ? 'active' : ''}>
                        <Link to="/image" onClick={() => {
                            if (isCategoryPage) {
                                setSelectedCategory(category.key);
                            }
                        }}>
                            {category.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Categories;







