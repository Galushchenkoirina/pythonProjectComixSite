import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { refreshAccessToken } from '../utils/auth'; // Импортируем функцию обновления токена

const App = () => {
    const history = useHistory();

    useEffect(() => {
        const checkTokens = async () => {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (!accessToken || !refreshToken) {
                alert('Ваш токен недействителен. Пожалуйста, войдите снова.');
                history.push('/login'); // Перенаправление на страницу входа
            } else {
                // Проверяем срок действия access token и обновляем его, если необходимо
                const tokenUpdated = await refreshAccessToken();
                if (!tokenUpdated) {
                    alert('Ваш токен недействителен. Пожалуйста, войдите снова.');
                    history.push('/login');
                }
            }
        };

        checkTokens();
    }, [history]);

    return (
        <div>
            {/drf/}
        </div>
    );
};

export default App;




