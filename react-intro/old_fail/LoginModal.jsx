import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import { useAuth } from '../src/components/AuthContext';
// import AothContext from "./Aut"; // Импортируйте ваш контекст аутентификации

const LoginModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                setIsAuthenticated(true);
                navigate('/');
                onClose(); // Закрываем модал после успешного входа
            } else {
                const errorData = await response.json();
                console.error('Ошибка входа:', errorData);
                alert('Ошибка входа: ' + (errorData.detail || 'Неверные учетные данные.'));
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Имя пользователя"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginModal;