import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const LoadingContext = createContext();

// Создаем провайдер
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Хук для использования контекста
export const useLoading = () => {
    return useContext(LoadingContext);
};
