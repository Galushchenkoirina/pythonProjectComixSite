import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Categories from './Categiries';
import ImageLoader from './ImageLoader';
import ImageDetail from './ImageDetail';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
// import ProtectedPage from './ProtectedPage';
// import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Delivery from './components/Delivery';
import Payment from './components/Payment';
import Touch from './components/Touch';
import {CartProvider} from './cart/CartContext';
// import Cart from './cart/Cart';
import ProductList from './cart/ProductList';
import HomePage from './HomePage';
import './components/LogReg.css';
// import Entrance from './components/Entrance';
import {AuthProvider} from './components/AuthContext';
// import SearchBar from './components/SearchBar';
import SearchPage from './components/SearchPage';
import Checkout from './cart/Checkout';



// import Navigation from './cart/Navigation'; // Ваш компонент навигации


const App = () => {
        const [selectedCategory, setSelectedCategory] = useState('all');
        // const [searchQuery, setSearchQuery] = useState(''); // Состояние для поискового запроса
        // const isAuthenticated = !!localStorage.getItem('access_token');


        return (
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <main className="main">
                            <Header/>

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
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                        {/*<Route path="/protected" element={<ProtectedRoute><ProtectedPage/></ProtectedRoute>}/>*/}
                                        <Route path="/logout" element={<Logout/>}/>
                                        <Route path="/delivery" element={<Delivery/>}/>
                                        <Route path="/payment" element={<Payment/>}/>
                                        <Route path="/touch" element={<Touch/>}/>
                                        {/*<Route path="/cart" element={<Cart/>}/>*/}
                                        <Route path="/product-list" element={<ProductList/>}/>
                                        <Route path="/search" element={<SearchPage/>}/>
                                        <Route path="/checkout" element={<Checkout/>}/>
                                         {/*<Cart />*/}
                                        {/*<Route path="/order-confirmation" element={<Cart />}/>*/}
                                    </Routes>
                                </div>
                            </div>
                        </main>
                        <Footer/>
                    </Router>
                </CartProvider>
            </AuthProvider>
        );
    }
;

export default App;

//
// <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
// <Route path="/image" element={<ProtectedRoute><ImageLoader selectedCategory={selectedCategory}/></ProtectedRoute>}/>
// <Route path="/image/:id" element={<ProtectedRoute><ImageDetail/></ProtectedRoute>}/>
// <Route path="/protected" element={<ProtectedRoute><ProtectedPage/></ProtectedRoute>}/>
