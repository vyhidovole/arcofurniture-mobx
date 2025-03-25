import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from '@/context/ThemeContext';
import Link from "next/link";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";

const ModalEntry = ({ show, onClose, setNewForm }) => {
     const { isDarkMode } = useTheme(); // Получаем доступ к теме
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        {
            name: "",
            email: "",
            password: "",
        },
        setNewForm
    );

    const router = useRouter();
    const dialogRef = useRef(null);
    const [isShowAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (show) {
            dialogRef.current.show();
            document.addEventListener("mousedown", handleBackgroundClick);
        } else {
            dialogRef.current.close();
            document.removeEventListener("mousedown", handleBackgroundClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleBackgroundClick);
        };
    }, [show]);

    // Обработчик события для закрытия диалогового окна
    const handleBackgroundClick = (e) => {
        // Check if the click target is not the dialog or its children
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            // Очищаем поля
            resetForm();
            onClose(); // Close the modal
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        // Проверяем наличие ошибок
        if (Object.keys(errors).length === 0) {
            // Если нет ошибок, отправляем данные
            const isSuccess = await handleSubmit(e); // Предполагается, что handleSubmit возвращает true/false

            // Если форма успешно отправлена и нет ошибок
            if (isSuccess) {
                localStorage.setItem("userData", JSON.stringify(formData));

                setShowAlert(true);
                resetForm(); // Сбрасываем форму

                setTimeout(() => {
                    setShowAlert(false);
                    onClose();
                }, 3000); // Закрываем алерт через 3 секунды
            }
        } else {
            // Если есть ошибки, вы можете обработать это здесь
            console.error("Форма содержит ошибки:", errors);
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center z-10 items-center ${show ? "block" : "hidden"}`}
            onClick={handleBackgroundClick} // Добавляем обработчик клика
        >
            <dialog ref={dialogRef} className="rounded-xl">
                <form onSubmit={handleFormSubmit} method="dialog">
                    <div
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-lg w-11/12 md:w-3/4 lg:w-72 h-auto flex flex-col`}
                        onClick={(e) => e.stopPropagation()} // Останавливаем всплытие клика на модалке
                    >
                        {/* Заголовок Модального окна */}
                        <div className="bottom-4 text-4xl ml-16">
                            <h1 className="font-bold">Войти</h1>
                        </div>

                        {/* Содержание Модального окна */}
                        <Input
                            className={errors.name ? "border-red-500" : ""}
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        <Input
                            className={errors.email ? "border-red-500" : ""}
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <Input
                            className={errors.password ? "border-red-500" : ""}
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <Link href="/forgot-password" className="mt-6 cursor-pointer" onClick={onClose}>
                            <p>Забыли пароль?</p>
                        </Link>

                        <Button type="submit" variant="secondary">
                            Отправить
                        </Button>

                        {isShowAlert && (
                            <Alert
                                variant="positive"
                                isOpen={isShowAlert}
                                onClose={() => setTimeout(() => setShowAlert(false), 3000)} // Передаем функцию
                            >
                                <h2>Авторизация прошла успешно!</h2>
                                <p>Вы авторизированны!</p>
                            </Alert>
                        )}
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ModalEntry;
