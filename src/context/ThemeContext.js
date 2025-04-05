import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
// const ThemeContext = createContext();

// // Провайдер для контекста
// export const ThemeProvider = ({ children }) => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     const toggleTheme = () => {
//         setIsDarkMode((prevMode) => {
//             console.log('Текущий режим:', prevMode); 
//             return !prevMode; // Переключаем режим
//         });
//     };
//     // Используем useEffect для изменения атрибута data-theme
//     useEffect(() => {
//         if (isDarkMode) {
//             document.body.setAttribute('data-theme', 'dark');
//         } else {
//             document.body.removeAttribute('data-theme');
//         }
//     }, [isDarkMode]);
//     return (
//         <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };
// Создаем контекст
const ThemeContext = createContext();

// Провайдер для контекста
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Проверяем, есть ли доступ к localStorage
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('isDarkMode');
            return savedTheme === 'true'; // Преобразуем строку в boolean
        }
        return false; // Значение по умолчанию
    });

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode; // Переключаем режим
            if (typeof window !== 'undefined') {
                localStorage.setItem('isDarkMode', newMode); // Сохраняем новое значение в localStorage
            }
            return newMode;
        });
    };

    // Используем useEffect для изменения атрибута data-theme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isDarkMode) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
            }
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
