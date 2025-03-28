import React from 'react';
import { Link } from 'react-router-dom';

const CartButton = ({ cartQuantity }) => {
    return (
        <Link to="/product-list" className="cart-button">
            <i className="fas fa-shopping-cart"></i>
        </Link>
    );
};


export default CartButton;