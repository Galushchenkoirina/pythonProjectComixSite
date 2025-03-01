import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                withCredentials: true
            };

            try {
                const response = await axios.get('http://localhost:8000/api/home/', config);
                setMessage(response.data.message);
            } catch (error) {
                if (error.response) {
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                } else {
                    console.log('Error:', error.message);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="form-signin mt-5 text-center">
                <h3>Hi {message}</h3>
            </div>
        </>
    );
}

export default Home;