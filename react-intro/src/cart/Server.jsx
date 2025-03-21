const handleCheckout = async () => {
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





// const handleCheckout = async () => {
//     const orderData = {
//         name: userName,
//         email: userEmail,
//         address: userAddress,
//         phone: userPhone,
//         payment_method: 'credit_card',
//         delivery_method: 'standard',
//         total: getTotalCost(),
//         items: cart.map(item => ({
//             product: item.id, // Здесь передаем ID продукта
//             quantity: item.quantity,
//             price: item.price,
//         })),
//     };
//
//     console.log('Данные заказа:', orderData); // Логирование данных
//
//     try {
//         const response = await fetch('http://localhost:8000/orders/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(orderData),
//         });
//
//         if (!response.ok) {
//             throw new Error('Ошибка при оформлении заказа');
//         }
//
//         const data = await response.json();
//         console.log('Заказ оформлен успешно:', data);
//         clearCart(); // Очистка корзины после успешного оформления
//     } catch (error) {
//         console.error('Ошибка при оформлении заказа:', error);
//         setError('Ошибка при оформлении заказа: ' + error.message);
//     }
// };


