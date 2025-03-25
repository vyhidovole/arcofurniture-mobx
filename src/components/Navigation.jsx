import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from '@/context/ThemeContext';
import '@/components/Header.css';

/* пункты меню в шапке */
const navItems = [
  { name: "Главная", path: "/" },
  { name: "Акции", path: "/Actions" },
  { name: "Сборка", path: "/Assembling" },
  { name: "Оплата", path: "/Payment" },
  { name: "Доставка", path: "/Delivery" },
  { name: "Наши работы", path: "/Work" },
  { name: "Контакты", path: "/Contacts" },
];



const Navigation = () => {

  const { isDarkMode, toggleTheme } = useTheme(); // Получаем доступ к теме
  // состояние (стейт) для активного пункта меню
  const [activeLink, setActiveLink] = useState("Главная");

  const router = useRouter();
  useEffect(() => {
    const currentPath = router.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveLink(activeItem.name);
    }
  }, [router.pathname]);

  // клик по активному пункту меню
  const onClickHandler = (link, path) => {
    if (link !== activeLink) {
      router.push(path);
      setActiveLink(link);
    }
    console.log(activeLink)
  };

  return (
    <header className={`shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-16 flex items-center`}>
      <div className="container flex justify-between">
        {/* Левая часть с первыми пятью пунктами меню */}
        <nav className="flex items-center gap-5">
          {navItems.slice(0, 5).map((item) => (
            <a
              onClick={() => onClickHandler(item.name, item.path)}//передаем путь
              className={`nav-link cursor-pointer
                 ${item.name === activeLink ?
                  "text-sky-500  underline-animation " : "text-gray-800"
                }${isDarkMode ? 'dark:text-sky-500' : 'text-gray-800'} `}
              key={item.path}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Правая часть с последними двумя пунктами меню */}
        <nav className="flex items-center gap-5">
          {navItems.slice(5).map((item) => (
            <a
              onClick={() => onClickHandler(item.name, item.path)}
              className={`nav-link cursor-pointer 
                ${item.name === activeLink ? "text-sky-500 underline-animation " : "text-gray-800"
                }`}
              key={item.path}
            >
              {item.name}
            </a>
          ))}
          {/* Переключатель темы */}
          <fieldset className="relative inline-block w-16 h-8">
            <input
              type="checkbox"
              className="switch opacity-0 w-0 h-0"
              id="theme-toggle"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label
              htmlFor="theme-toggle"
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></label>
            <span onClick={toggleTheme} className={`absolute left-1 top-1 block w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-8' : ''}`}></span>
          </fieldset>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;