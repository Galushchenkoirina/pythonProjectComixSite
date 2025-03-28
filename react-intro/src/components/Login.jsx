import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Импортируйте контекст аутентификации
import './LogReg.css'; // Импорт стилей

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Получаем функцию login из контекста

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
                login(username); // Используем функцию login для установки аутентификации
                // onLogin(username);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Ошибка входа:', errorData);
                setErrorMessage(errorData.detail || 'Неверные учетные данные.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setErrorMessage('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Вход</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Имя пользователя"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        required
                        className="form-input"
                    />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="login-button">Войти</button>
            </form>
        </div>
    );
};

export default Login;