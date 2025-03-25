import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const ThemeContext = createContext();

// Провайдер для контекста
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            console.log('Текущий режим:', prevMode); 
            return !prevMode; // Переключаем режим
        });
    };
    // Используем useEffect для изменения атрибута data-theme
    useEffect(() => {
        if (isDarkMode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }, [isDarkMode]);
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Хук для использования контекста
export const useTheme = () => {
    return useContext(ThemeContext);
};
