export const refreshAccessToken = async () => {
    const refreshToken = async () => {
    try {
        const response = await axios.post('/token/refresh/', {
            refresh: localStorage.getItem('refresh_token'), // Убедитесь, что вы передаете refresh токен
        });
        // Обработка успешного ответа
        const { access } = response.data;
        localStorage.setItem('access_token', access);
    } catch (error) {
        console.error('Ошибка обновления токена', error);
    }
};




//     const refreshToken = localStorage.getItem('refresh_token');
//
//     if (!refreshToken) {
//         console.error('Refresh token отсутствует');
//         return;
//     }
//
//     try {
//         const response = await fetch('http://localhost:8000/token/refresh/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refresh: refreshToken }),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Ошибка при обновлении токена:', errorData);
//             if (errorData.detail === 'Токен занесен в черный список') {
//                 alert('Ваш токен недействителен. Пожалуйста, войдите снова.');
//                 // Здесь можно перенаправить пользователя на страницу входа
//                 return false; // Возвращаем false, если токен недействителен
//             }
//             throw new Error('Ошибка при обновлении токена');
//         }
//
//         const data = await response.json();
//         localStorage.setItem('access_token', data.access);
//         return true; // Возвращаем true, если обновление прошло успешно
//     } catch (error) {
//         console.error('Ошибка:', error);
//         return false; // Возвращаем false в случае ошибки
//     }
// };
