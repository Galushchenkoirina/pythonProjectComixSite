import axios from 'axios';

const handleRegister = async () => {
    try {
        const response = await axios.post('http://localhost:8000/register/', {
            username: 'testuser',
            password: 'testpass',
        });
        console.log('Регистрация успешна:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Ошибка:', error.response.data);
        } else {
            console.error('Ошибка сети:', error.message);
        }
    }
};





















// import React from 'react';
// import axios from 'axios';
//
// let refresh = false;
// axios.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401 && !refresh) {
//         refresh = true;
//         console.log(localStorage.getItem('refresh_token'));
//         const config = {
//             headers: {
//                 'Content-Type': `application/json`,
//             },
//             withCredentials: true
//         };
//         const response = await axios.post('http://localhost:8000/api/token/refresh/', {
//             refresh: localStorage.getItem('refresh_token'),
//         }, config);
//
//         if (response.status === 200) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.["access"]}`;
//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);
//             return axios(error.config);
//         }
//     }
// })