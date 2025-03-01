import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Logout = () => {
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                // Очистка localStorage и заголовков
                localStorage.clear();
                delete axios.defaults.headers.common["Authorization"];

                // Установите состояние аутентификации в false
                setIsAuthenticated(false);

                // Здесь можно добавить уведомление о выходе, если нужно
                console.log('Вы успешно вышли из системы.');
            } catch (e) {
                console.log('Logout not work', e);
            }
        })();
    }, [setIsAuthenticated]);

    return (
        <div>Вы покинули сайт. Будем рады снова Вас видеть.</div>
    );
}

export default Logout;



