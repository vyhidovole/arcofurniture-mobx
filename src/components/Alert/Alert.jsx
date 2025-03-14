import React, { useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";


/**
 * Компонент уведомления.
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.variant="neutral"] - Вариант стиля компонента.
 * @param {ReactNode} props.children - Дочерние элементы компонента.
 * @param {boolean} props.isOpen - Флаг указывающий открыт/закрыт компонент.
 * @param {function} props.onClose - Функция обратного вызова для закрытия компонента.
 */
const Alert = ({ variant = "neutral", children, isOpen, onClose }) => {
  // Стили для вариантов компонента
  const variantClasses = {
    neutral: "bg-gray-100 text-gray-800",
    info: "bg-blue-100 text-blue-800",
    positive: "bg-green-100 text-green-800",
    notice: "bg-yellow-100 text-yellow-800",
    negative: "bg-red-100 text-red-800",
  };

  // Варианты иконок
  const iconVariant = {
    info: <FaInfoCircle className="w-5 h-5" />,
    positive: <FaCheckCircle className="w-5 h-5" />,
    notice: <FaExclamationCircle className="w-5 h-5" />,
    negative: <FaTimesCircle className="w-5 h-5" />,
  };

  // Стейт для открытия/закрытия компонента.
  const [isVisible, setIsVisible] = useState(isOpen);

  // Если не передавать в хук, то не увидит изменений.
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  /**
   * Закрыть компонент.
   * Вызывает функцию onClose после закрытия компонента.
   */
  const closeAlert = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isOpen) return null;
  return (
    
    isVisible && (
      <div
        className={`flex items-center ${variantClasses[variant]} fixed top-4 left-1/2 transform -translate-x-1/2 w-96 px-3 py-2 rounded-md z-50`}
        role="alert"
      >
       
        <div className="">{iconVariant[variant]}</div>
        <div>{children}</div>
      </div>
    )
  );
 
};

export default Alert;
