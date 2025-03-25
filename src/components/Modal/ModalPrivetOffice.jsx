import React, { useState } from "react";
import Link from "next/link";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";

const ModalPrivetOffice = ({ setNewState }) => {
    const { formData, errors, handleChange, handleSubmit,resetForm } = useForm({
        name: "",
        email: "",
        password: "",
    }, setNewState);

    const [isShowAlert, setShowAlert] = useState(false);
    

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Вызываем handleSubmit из useForm для отправки данных
        const isSuccess = await handleSubmit(e); // Предполагается, что handleSubmit возвращает true/false

        // Если форма успешно отправлена и нет ошибок
        if (isSuccess && Object.keys(errors).length === 0) {
            localStorage.setItem('userData', JSON.stringify(formData));
           
            setShowAlert(true);
            resetForm(); // Сбрасываем форму
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Закрываем алерт через 3 секунды
        }
    };

    return (
        <form onSubmit={handleFormSubmit} method="dialog" >
            <div className="${isDarkMode ? 'bg-gray-800' : 'bg-white'}p-4  shadow-lg w-72 h-96 flex flex-col mt-6 " >
                {/* Заголовок Модального окна */}
                <div className=" bottom-4 text-4xl ml-16">
                    <h1 className="font-bold ">Войти</h1>
                </div>
                <Input
                    className={errors.name ? "border-red-500" : ""}
                    label="Name"
                    type="name"
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

                <Link href="/forgot-password" className="mt-6 cursor-pointer"><p>Забыли пароль?</p>
                </Link>
                <Button
                    type="submit"
                    variant="secondary">Отправить
                </Button>

                <div className=" flex justify-between  items-center">
                    <p className="text-base text-center mt-10 ">Нет аккаунта?</p>
                    <Link href="/account-page" className="mt-10 cursor-pointer">
                        <p >Создать</p>
                    </Link>

                </div>
                {isShowAlert && (
                    <Alert
                        variant="positive"
                        isOpen={isShowAlert}
                        onClose={setTimeout(() => setShowAlert(false), 3000)}
                    >
                        <h2>Авторизация прошла успешно!</h2>
                        <p>Вы авторизированны!</p>
                    </Alert>
                )}
            </div>

        </form>


    );
}

export default ModalPrivetOffice;
