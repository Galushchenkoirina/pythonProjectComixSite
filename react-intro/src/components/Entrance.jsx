import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Entrance = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuth(token !== null);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuth && <Link to="/" className="nav-link active">Home</Link>}
                        {isAuth ? (
                            <Link to="/logout" className="nav-link active">Logout</Link>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link active">Login</Link>
                                <Link to="/register" className="nav-link active">Register</Link>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Entrance;