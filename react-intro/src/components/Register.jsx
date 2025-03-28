import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogReg.css';

const Register = ({ onRegister }) => { // Добавляем пропс onRegister
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Сбросить ошибку перед новой попыткой

        try {
            const response = await axios.post('http://localhost:8000/register/', {
                username,
                password,
            });

            // Если регистрация успешна, обновите состояние аутентификации
            if (response.status === 201) {
                setIsAuthenticated(true); // Установите состояние аутентификации в true
                register(username);
                // onRegister(username); // Вызываем onRegister с именем пользователя
                navigate('/'); // Перенаправьте на главную страницу или другую защищенную страницу
            }
        } catch (error) {
            // Обработка ошибок
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Ошибка регистрации'); // Установите сообщение об ошибке
            } else {
                setError('Ошибка сети. Пожалуйста, попробуйте позже.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Регистрация</h2>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Сообщение об ошибке */}
                <button type="submit" className="register-button">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;