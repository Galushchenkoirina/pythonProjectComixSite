import React from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <aside className="book-filter">
            <ul>
                {categories.map(category => (
                    <li key={category.key} className={selectedCategory === category.key ? 'active' : ''}>
                        <Link to="/image" onClick={() => setSelectedCategory(category.key)}>
                            {category.label} {/* Здесь выводим русское название */}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Categories;







// const Categories = ({ selectedCategory, setSelectedCategory }) => {
//     const categories = ['all', 'kniga', 'komiks', 'manga', 'ranobe', 'entsiklopediya', 'other'];
//
//     return (
//         <aside className="book-filter">
//             <ul>
//                 {categories.map(category => (
//                     <li key={category} className={selectedCategory === category ? 'active' : ''}>
//                         <Link to="/image" onClick={() => setSelectedCategory(category)}>
//                             {category.charAt(0).toUpperCase() + category.slice(1)}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </aside>
//     );
// };
//
// export default Categories;

