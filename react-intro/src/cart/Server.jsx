const handleCheckout = async () => {
    // const orderData = {
    //     name: userName, // Предположим, вы получаете имя пользователя из состояния
    //     email: userEmail, // Email пользователя
    //     address: userAddress, // Адрес пользователя
    //     phone: userPhone, // Телефон пользователя
    //     payment_method: 'credit_card', // Пример метода оплаты
    //     delivery_method: 'standard', // Пример метода доставки
    //     total: getTotalCost(), // Итоговая стоимость
    //     items: cart.map(item => ({
    //         product_id: item.id, // ID продукта
    //         name: item.name, // Название продукта
    //         price: item.price, // Цена продукта
    //         quantity: item.quantity, // Количество
    //     })),
    // };


    const orderData = {
        name: userName,
        email: userEmail,
        address: userAddress,
        phone: userPhone,
        payment_method: 'credit_card',
        delivery_method: 'standard',
        total: getTotalCost(),
        items: cart.map(item => ({
            product: item.id, // Здесь передаем ID продукта
            quantity: item.quantity,
            price: item.price,
        })),
    };

    console.log('Данные заказа:', orderData); // Логирование данных

    try {
        const response = await fetch('http://localhost:8000/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при оформлении заказа');
        }

        const data = await response.json();
        console.log('Заказ оформлен успешно:', data);
        clearCart(); // Очистка корзины после успешного оформления
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        setError('Ошибка при оформлении заказа: ' + error.message);
    }
};


// const handleCheckout = () => {
//     if (cart.length === 0) {
//         alert("Ваша корзина пуста! Добавьте товары для оформления заказа.");
//         return;
//     }
//
//     // Отправка данных на сервер
//     fetch('/api/checkout', {
//         method: 'POST',
//         body: JSON.stringify(cart),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Сеть не в порядке');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Заказ оформлен:", data);
//         // Здесь можно добавить логику для очистки корзины или перехода на страницу подтверждения
//     })
//     .catch(error => {
//         console.error("Ошибка оформления заказа:", error);
//     });
// };
