import React, {useState} from 'react';
import {AuthProvider, useAuth} from './components/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Categories from './Categiries';
import HomePage from './HomePage';
import ImageLoader from './ImageLoader';
import ImageDetail from './ImageDetail';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Delivery from './components/Delivery';
import Payment from './components/Payment';
import Touch from './components/Touch';
import ProductList from './cart/ProductList';
import SearchPage from './components/SearchPage';
import Checkout from './cart/Checkout';
import Footer from './components/Footer';
import {CartProvider} from './cart/CartContext';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const {isAuthenticated, login, register} = useAuth();
    const userName = isAuthenticated ? "Имя пользователя" : null;

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <main className="main">
                        <Header userName={userName}/> {/* Передаем имя пользователя в Header */}

                        <div className="container">
                            <div className="book-content" id="book-content">
                                <Categories selectedCategory={selectedCategory}
                                            setSelectedCategory={setSelectedCategory}/>
                            </div>
                            <div className="main-content" id="main-content">
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="/image" element={<ImageLoader selectedCategory={selectedCategory}/>}/>
                                    <Route path="/image/:id" element={<ImageDetail/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/logout" element={<Logout/>}/>
                                    <Route path="/delivery" element={<Delivery/>}/>
                                    <Route path="/payment" element={<Payment/>}/>
                                    <Route path="/touch" element={<Touch/>}/>
                                    <Route path="/product-list" element={<ProductList/>}/>
                                    <Route path="/search" element={<SearchPage/>}/>
                                    <Route path="/checkout" element={<Checkout/>}/>
                                </Routes>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;

