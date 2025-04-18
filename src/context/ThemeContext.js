import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Провайдер для контекста темы.
 * Оборачивает дочерние компоненты и предоставляет им доступ к состоянию темы (светлая/темная).
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, которые будут иметь доступ к контексту темы.
 * @returns {JSX.Element} Элемент, представляющий провайдер контекста темы.
 *
 * @example
 * <ThemeProvider>
 *   <YourComponent />
 * </ThemeProvider>
 */
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
/**
     * Переключает режим темы между светлым и темным.
     * Обновляет состояние и сохраняет новое значение в localStorage.
     */
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

/**
 * Хук для использования контекста темы.
 *
 * @returns {Object} Объект с состоянием темы и методом для переключения.
 * @returns {boolean} isDarkMode - Состояние темы (true, если темный режим активен).
 * @returns {Function} toggleTheme - Метод для переключения темы.
 *
 * @example
 * const { isDarkMode, toggleTheme } = useTheme();
 */
export const useTheme = () => {
    return useContext(ThemeContext);
};
