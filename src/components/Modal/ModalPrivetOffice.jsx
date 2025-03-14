import React, { useState, useRef } from "react";
import Link from "next/link";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";

const ModalPrivetOffice = ({ onClose }) => {
    const { formData, errors, handleChange, handleSubmit } = useForm({
        name: "",
        email: "",
        password: "",
    });
    // const dialogRef = useRef(null)
    //  const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // Стейт для закрытия компонента уведомления
    const [isShowAlert, setShowAlert] = useState(false);

    // const handleSubmit = (event) => {
    //     event.preventDefault() //предотвращаем перезагрузку страницы

    //     //создаём объект с данными для отправки
    //     const formData = {
    //         email: email,
    //         password: password,
    //     }
    //     //Сохраняем данные в localStorage
    //     localStorage.setItem('formData', JSON.stringify(formData))
    //     console.log('Данные сохранены в localStorage:', formData)

    //     //очищаем поля
    //     setEmail('')
    //     setPassword('')

    //     //закрываем диалоговое окно
    //     onClose()
    // }




    return (
        <form onSubmit={handleSubmit} method="dialog" >
            <div className="bg-white p-4  shadow-lg w-72 h-96 flex flex-col mt-6 " >
                {/* Заголовок Модального окна */}
                <div className=" bottom-4 text-4xl ml-16">
                    <h1 className="font-bold ">Войти</h1>
                </div>

                {/* Содержание Модального окна */}

                {/* <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Обновление состояния для имени 
                    placeholder="E-Mail"
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 mt-5"
                /> */}
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
                    onClick={() => setShowAlert(true)}
                    variant="secondary">Отправить
                </Button>

                <div className=" flex justify-between  items-center">
                    <p className="text-base text-center mt-6 ">Нет аккаунта?</p>
                    <Link href="/account-page" className="mt-6 cursor-pointer">
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
