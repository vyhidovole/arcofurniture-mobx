import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { LiaTimesSolid } from "react-icons/lia"
import Basket from "../Basket";

/**
 * Компонент выдвигающейся панели.
 *
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг, указывающий открыта/закрыта панель.
 * @param {Function} props.onClose - Функция обратного вызова при закрытии панели.
 * @param {ReactNode} props.children - Дочерние элементы панели.
 * @param {string} props.titleDrawer - Заголовок панели.
 */
export const Drawer = ({ isOpen, onClose,  titleDrawer }) => {
  const drawerRef = useRef(null);

  /**
   * Функция для закрытия панели.
   *
   * @type {Function}
   */
  const closeDrawer = useCallback(() => {
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
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        closeDrawer();
      }
    },
    [drawerRef, closeDrawer]
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
          ref={drawerRef}
          className={`absolute max-h-full h-full w-96 p-8 bg-gray-300 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <header className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">{titleDrawer}</h2>
            <button
              onClick={closeDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              <LiaTimesSolid />
            </button>
          </header>
          <main> <Basket /> </main>
          <footer className="flex justify-end mt-4"></footer>
        </aside>
      </div>,
      document.body
    )
  );
};
