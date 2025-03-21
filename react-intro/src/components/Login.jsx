import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Импортируйте контекст аутентификации
import './LogReg.css'; // Импорт стилей

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Хук для навигации
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для установки состояния аутентификации

    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

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
                <button type="submit" className="login-button">Войти</button>
            </form>
        </div>
    );
};

export default Login;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Импортируйте контекст аутентификации
//
//
// const Login = () => {
//     // Состояние для хранения имени пользователя и пароля
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Хук для навигации
//     const { setIsAuthenticated } = useAuth(); // Получаем функцию для установки состояния аутентификации
//
//     // Обработчик формы входа
//     const handleLogin = async (e) => {
//         e.preventDefault(); // Предотвращаем перезагрузку страницы
//
//         try {
//             // Выполняем запрос к API для получения токенов
//             const response = await fetch('http://localhost:8000/token/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }), // Отправляем имя пользователя и пароль
//             });
//
//             // Проверяем, успешен ли ответ
//             if (response.ok) {
//                 const data = await response.json(); // Получаем данные из ответа
//                 // Сохраняем токены в localStorage
//                 localStorage.setItem('access_token', data.access);
//                 localStorage.setItem('refresh_token', data.refresh);
//
//                 // Устанавливаем состояние аутентификации
//                 setIsAuthenticated(true);
//                 // Перенаправляем пользователя на главную страницу
//                 navigate('/');
//             } else {
//                 // Если произошла ошибка, получаем информацию об ошибке
//                 const errorData = await response.json();
//                 console.error('Ошибка входа:', errorData); // Выводим ошибку в консоль
//                 alert('Ошибка входа: ' + (errorData.detail || 'Неверные учетные данные.')); // Показываем сообщение об ошибке
//             }
//         } catch (error) {
//             console.error('Ошибка:', error); // Выводим ошибку в консоль
//             alert('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.'); // Сообщение об ошибке
//         }
//     };
//
//     return (
//         <form onSubmit={handleLogin}>
//             <h2>Вход</h2> {/* Заголовок формы */}
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)} // Обновляем состояние имени пользователя
//                 placeholder="Имя пользователя"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)} // Обновляем состояние пароля
//                 placeholder="Пароль"
//                 required
//             />
//             <button type="submit">Войти</button> {/* Кнопка для отправки формы */}
//         </form>
//     );
// };
//
// export default Login;


