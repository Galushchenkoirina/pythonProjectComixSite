import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import HomePage from './HomePage';
import ImageLoader from './ImageLoader';
import ImageDetail from './ImageDetail';
import Register from './Register';
import Login from './Login';
import ProtectedPage from './ProtectedPage';
import ProtectedRoute from './ProtectedRoute';
import Modal from './Modal';


const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login'); // 'login' или 'register'

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <main className="main">
                <header className="header">
                    <div className="container">
                        <nav className="menu">
                            <ul>
                                <li><Link to="/">comix.by</Link></li>
                                <li><a href="#">Доставка</a></li>
                                <li><a href="#">Оплата</a></li>
                                <li><a href="#">Контакты</a></li>
                                <li>
                                    <button onClick={() => openModal('login')}>Вход</button>
                                </li>
                                <li>
                                    <button onClick={() => openModal('register')}>Регистрация</button>
                                </li>
                            </ul>
                        </nav>
                        <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType}/>
                        <a href="tel:375297777777" className="phone">+375 29 777 77 77</a>
                    </div>
                </header>
            </main>
            <div className="container">
                <div className="book-content" id="book-content">
                    <aside className="book-filter">
                        <ul>
                            <li className={selectedCategory === 'all' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('all')}>Каталог</Link>
                            </li>
                            <li className={selectedCategory === 'kniga' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('kniga')}>Книги</Link>
                            </li>
                            <li className={selectedCategory === 'komiks' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('komiks')}>Комиксы</Link>
                            </li>
                            <li className={selectedCategory === 'manga' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('manga')}>Манга</Link>
                            </li>
                            <li className={selectedCategory === 'ranobe' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('ranobe')}>Ранобэ</Link>
                            </li>
                            <li className={selectedCategory === 'entsiklopediya' ? 'active' : ''}>
                                <Link to="/image"
                                      onClick={() => setSelectedCategory('entsiklopediya')}>Энциклопедии</Link>
                            </li>
                            <li className={selectedCategory === 'other' ? 'active' : ''}>
                                <Link to="/image" onClick={() => setSelectedCategory('other')}>Прочее</Link>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div className="main-content" id="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/image" element={<ImageLoader
                            selectedCategory={selectedCategory}/>}/> {/* Передаем выбранную категорию */}
                        <Route path="/image/:id" element={<ImageDetail/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route
                            path="/protected"
                            element={isAuthenticated ? <ProtectedPage/> : <Navigate to="/login"/>}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;