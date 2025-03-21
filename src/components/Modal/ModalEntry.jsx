import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ModalEntry = ({ show, onClose}) => {
   
    const router = useRouter();
    const dialogRef = useRef(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   

    useEffect(() => {
        if (show) {
            dialogRef.current.show();
            document.addEventListener('mousedown', handleBackgroundClick);
        } else {
            dialogRef.current.close();
            document.removeEventListener('mousedown', handleBackgroundClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleBackgroundClick);
        };
    }, [show]);

    const handleSubmit = (event) => {
        event.preventDefault() //предотвращаем перезагрузку страницы

        //создаём объект с данными для отправки
        const formData = {
            email: email,
            password: password,
        }
        //Сохраняем данные в localStorage
        localStorage.setItem('formData', JSON.stringify(formData))
        console.log('Данные сохранены в localStorage:', formData)

        //очищаем поля
        setEmail('')
        setPassword('')

        //закрываем диалоговое окно
        onClose()
    }
    //обработчик события для закрытия диалоговго окна
    const handleBackgroundClick = (e) => {
        // Check if the click target is not the dialog or its children
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            onClose(); // Close the modal
        }

    }



    return (
        <div className={`fixed inset-0  bg-black bg-opacity-50  flex justify-center z-10 items-center ${show ? 'block' : 'hidden'}`} onClick={handleBackgroundClick} // Добавляем обработчик клика
        >
            <dialog ref={dialogRef} className="rounded-xl">

                <form onSubmit={handleSubmit} method="dialog" >
                    <div className="bg-white p-4  shadow-lg w-11/12 md:w-3/4 lg:w-72 h-96 flex flex-col " onClick={(e) => e.stopPropagation()}>{/* Останавливаем всплытие клика на модалке */}
                        {/* Заголовок Модального окна */}
                        <div className=" bottom-4 text-4xl ml-16">
                            <h1 className="font-bold ">Войти</h1>
                        </div>

                        {/* Содержание Модального окна */}

                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Обновление состояния для имени 
                            placeholder="E-Mail"
                            required
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 mt-5"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Обновление состояния для телефона
                            placeholder="Ваш телефон"
                            required
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 mt-5"
                        />
                        <Link href="/forgot-password" className="mt-6 cursor-pointer" onClick={onClose}><p>Забыли пароль?</p></Link>
                        <button
                            type="submit"
                            className="with-full p-4 bg-slate-600 text-white rounded-xl mt-6 cursor-pointer">Войти
                        </button>
                        <div className=" flex justify-between  items-center">
                            <p className="text-base text-center mt-6 ">Нет аккаунта?
                            </p>
                            <Link href="/account-page" className="mt-6 cursor-pointer" onClick={onClose}>
                                <p >Создать</p>
                            </Link>
                        </div>

                    </div>
                </form>

            </dialog>
        </div>
    );
}

export default ModalEntry;
