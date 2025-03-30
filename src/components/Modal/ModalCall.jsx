import React, { useRef, useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";


const ModalCall = ({ isOpen, onClose, setNewForm }) => {
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        {
            name: "",
            phone: "",
            
        },
        setNewForm
    );
    const dialogRef = useRef(null);
    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
   
    // Используем useRef для открытия/закрытия модалки
    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

   // Обработчик клика для закрытия модалки по крестику
    const handleClose = () => {
        resetForm(); // Сбрасываем форму перед закрытием
        onClose(); // Закрываем модалку
    };
   
    // Обработчик внешнего клика для закрытия модалки
    const handleBackgroundClick = (e) => {
        if (e.target === dialogRef.current) {
            resetForm();
            onClose();
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Если нет ошибок, отправляем данные
        const isSuccess = await handleSubmit(e);

        if (isSuccess) {
            localStorage.setItem("userData", JSON.stringify(formData));
            setAlertMessage("Вам перезвонят в течении 30 минут");
            setAlertVariant('positive');
            setShowAlert(true);
            resetForm();

            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 3000);
        } else {
            // Устанавливаем сообщение и показываем Alert
            setAlertMessage("Данные введены не корректно.");
            setAlertVariant('negative'); // Установите нужный вариант
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
            return
        }
       
        };
   
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
   
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`} onClick={handleBackgroundClick} // Добавляем обработчик клика
        >
            <dialog ref={dialogRef} className="rounded-xl">
                <form onSubmit={handleFormSubmit} method="dialog" >
                    <div className="bg-white p-4  shadow-lg w-72 h-96 flex flex-col " onClick={(e) => e.stopPropagation()}>{/* Останавливаем всплытие клика на модалке */}
                        {/* Заголовок Модального окна */}
                        <div className="flex justify-between items-center bottom-4 ">
                            <h3 className="font-bold">Заказать звонок</h3>
                            <button type="button"
                                onClick={handleClose}
                                className="border-gray-300 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>
                        <div className="border-b border-gray-300 pb-2 w-full"></div>
                        {/* Содержание Модального окна */}
                        <div className="flex flex-col">
                            <div className="flex mt-7 ">
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
                                <h4 className="">8(961)5259191</h4>
                            </div>

                            {/* <input 
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Обновление состояния для имени 
                             placeholder="Ваше имя"
                             required  
                             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 mt-5"
                             /> */}
                            <Input
                                className={errors.name ? "border-red-500" : ""}
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            {/* <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} // Обновление состояния для телефона
                                placeholder="Ваш телефон"
                                required
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 mt-5"
                            /> */}
                            <Input
                                className={errors.phone ? "border-red-500" : ""}
                                label="Телефон"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                            />
                            {/* <button
                                type="submit"
                                className="with-full p-4 bg-slate-600 text-white rounded-xl mt-6 ">Отправить
                            </button> */}
                            <Button 
                            type="submit" 
                            variant="secondary">
                                Отправить
                            </Button>

                            {isShowAlert && (
                                <Alert
                                    variant={alertVariant}
                                    isOpen={isShowAlert}
                                    onClose={handleCloseAlert}
                                >
                                    {alertMessage}
                                </Alert>
                            )}
                            <p className="text-xs text-center mt-6">Отправляя форму, я даю свое согласие на  обработку моих персональных данных.
                            </p>
                        </div>

                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ModalCall;
