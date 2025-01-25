import React, { useState } from "react";
import { useRouter } from "next/router";

/* пункты меню в шапке */
const navItems = [
  { name: "Components", path: "/" },
  { name: "Акции", path: "/Actions" },
  { name: "Сборка", path: "/Assembling" },
  { name: "Оплата", path: "/Payment" },
  { name: "Доставка", path: "/Delivery" },
  { name: "Наши работы", path: "/Work" },
  { name: "Контакты", path: "/Contacts" },
];



const Navigation = () => {
  // состояние (стейт) для активного пункта меню
  const [activeLink, setActiveLink] = useState("Home");

  const router = useRouter();

  // клик по активному пункту меню
  const onClickHandler = (link, path) => {
    if (link !== activeLink) {
      router.push(path);
      setActiveLink(link);
    }
  };

  return (
    <header className="shadow bg-white h-16 flex items-center">
      <div className="container flex justify-between">
        {/* Левая часть с первыми пятью пунктами меню */}
        <nav className="flex items-center gap-5">
          {navItems.slice(0, 5).map((item) => (
            <a
              onClick={() => onClickHandler(item.name,item.path)}//передаем путь
              className={`cursor-pointer ${
                item.name === activeLink ? "text-sky-500" : ""
              }`}
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
              className={`cursor-pointer ${
                item.name === activeLink ? "text-sky-500" : ""
              }`}
              key={item.path}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;