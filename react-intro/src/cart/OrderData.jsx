const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
        ...customerData,
        items: cartItems,
        total: calculateTotal(),
    };

    fetch('http://localhost:8000/orders/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть не отвечает');
        }
        return response.json();
    })
    .then(data => {
        console.log('Успех:', data);
        clearCart(); // Очистить корзину после успешного оформления заказа
    })
    .catch((error) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, проверьте введенные данные и попробуйте снова.');
    });
};
