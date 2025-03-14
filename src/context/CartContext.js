import React, { createContext, useContext, useState } from 'react';


// Создаём контекст
const CartContext = createContext();

// Провайдер для контекста
export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0); // Состояние для количества товаров в корзине

    const addToCart = () => {
        setCount(prevCount => prevCount + 1); // Увеличиваем количество товаров
    };

    const removeFromCart = () => {
        setCount(prevCount => Math.max(prevCount - 1, 0)); // Уменьшаем количество товаров, не меньше 0
    };

    

    return (
        <CartContext.Provider value={{ count, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Хук для использования контекста
export const useCart = () => {
    return useContext(CartContext);
};
