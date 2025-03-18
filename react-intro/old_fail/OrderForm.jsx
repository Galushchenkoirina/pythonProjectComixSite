import React from 'react';
import { useForm } from 'react-hook-form';


const OrderForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOrderSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleOrderSubmit)}>
            <h2>Оформление заказа</h2>
            
            <div>
                <label>Имя:</label>
                <input 
                    type="text" 
                    {...register('name', { required: 'Имя обязательно' })} 
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label>Адрес:</label>
                <input 
                    type="text" 
                    {...register('address', { required: 'Адрес обязателен' })} 
                />
                {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div>
                <label>Телефон:</label>
                <input 
                    type="tel" 
                    {...register('phone', { required: 'Телефон обязателен' })} 
                />
                {errors.phone && <p>{errors.phone.message}</p>}
            </div>

            <div>
                <label>Электронная почта:</label>
                <input 
                    type="email" 
                    {...register('email', { 
                        required: 'Электронная почта обязательна', 
                        pattern: { 
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                            message: 'Введите корректный адрес электронной почты' 
                        } 
                    })} 
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Способ оплаты:</label>
                <select {...register('paymentMethod', { required: 'Выберите способ оплаты' })}>
                    <option value="">Выберите способ оплаты</option>
                    <option value="creditCard">Кредитная карта</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Наличные</option>
                </select>
                {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}
            </div>
            
            <button type="submit">Отправить заказ</button>
        </form>
    );
};

export default OrderForm;

