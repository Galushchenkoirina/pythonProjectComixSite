import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';
import Header from './components/Header';
import Categories from './Categiries';
import ImageLoader from './ImageLoader';
import ImageDetail from './ImageDetail';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedPage from './ProtectedPage';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './HomePage';
// import Home from './components/Home';
import Entrance from './components/Entrance';
import {AuthProvider} from './components/AuthContext';


const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <AuthProvider>
            <Router>
                <main className="main">
                    <Header openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal}
                            modalType={modalType}/>
                    <div className="container">
                        <div className="book-content" id="book-content">
                            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                        </div>
                        <div className="main-content" id="main-content">
                            <Routes>
                                <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                                <Route path="/image" element={<ProtectedRoute><ImageLoader
                                    selectedCategory={selectedCategory}/></ProtectedRoute>}/>
                                <Route path="/image/:id" element={<ProtectedRoute><ImageDetail/></ProtectedRoute>}/>


                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/protected" element={<ProtectedRoute><ProtectedPage/></ProtectedRoute>}/>
                                <Route path="/logout" element={<Logout/>}/>
                            </Routes>
                        </div>
                    </div>
                </main>
            </Router>
        </AuthProvider>
    );
};

export default App;
