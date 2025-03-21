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




