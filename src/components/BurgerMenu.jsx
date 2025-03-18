import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { LiaTimesSolid } from "react-icons/lia"


/**
 * Компонент выдвигающейся панели.
 *
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг, указывающий открыта/закрыта панель.
 * @param {Function} props.onClose - Функция обратного вызова при закрытии панели.
 * @param {ReactNode} props.children - Дочерние элементы панели.
 * @param {string} props.titleBurger - Заголовок панели.
 */
export const BurgerMenu = ({ isOpen, onClose, titleBurger }) => {
    const burgerRef = useRef(null);

    /**
     * Функция для закрытия панели.
     *
     * @type {Function}
     */
    const closeBurger = useCallback(() => {
        onClose();
    }, [onClose]);

    /**
     * Обработчик клика вне панели для закрытия панели.
     *
     * @type {Function}
     * @param {Event} event - Событие клика.
     */
    const handleClick = useCallback(
        (event) => {
            if (burgerRef.current && !burgerRef.current.contains(event.target)) {
                closeBurger();
            }
        },
        [burgerRef, closeBurger]
    );

    /**
     * Добавляет или удаляет обработчик клика вне панели при открытии или закрытии панели.
     */

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick]);

    return (
        isOpen &&
        createPortal(
            <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black">
                <aside
                    ref={burgerRef}
                    className={`absolute max-h-full h-full w-96 p-8 bg-gray-300 transition-transform duration-300 ease-in-out overflow-y-auto`}
                >
                    <header className="flex justify-between m-4">
                        <h2 className="text-xl font-bold">{titleBurger}</h2>
                        <button
                            onClick={closeBurger}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <LiaTimesSolid />
                        </button>
                    </header>
                    <main>
                        <ul>
                            <li>Кухни</li>
                            <li>Спальи</li>
                            <li>Детские</li>
                            <li>Гостиные</li>
                            <li>Диваны</li>
                            <li>Прихожие</li>
                            <li>Шкафы-купе</li>
                        </ul>
                    </main>
                    <footer className="flex justify-between mt-4">
                        <ul>
                            <li>
                                <div>
                                    <p>ул.Московская 144 корп.-1</p>
                                    <button className="text-red-500 underline" >
                                        Схема проезда
                                    </button>
                                </div>
                            </li>
                            <li className="mt-4">
                            <div className="flex">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 "
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        ></path>
      </svg>
      <div>
      <h4 className="">8(961)5259191</h4>
        <button className="border-red-500 border-2 text-red-500 rounded pl-2 pr-2 hover:bg-gray-200" 
        >
          Заказать звонок
        </button>

      </div>
       
      
    </div>   
                            </li>
                            <li className="mt-2">
                            <button type="button" className="entry mt-4">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          ></path>
        </svg>
        <p className="underline-animation">Войти</p>

      </button>
                            </li>
                        </ul>
                    </footer>
                </aside>
            </div>,
            document.body
        )
    );
};
