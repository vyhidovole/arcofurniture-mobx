import React, { useState, } from "react"
import useForm from "@/hooks/useForm";
import Link from "next/link";
import Alert from "@/components/Alert/Alert";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";



const Account = (setNewState) => {
    
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        { name: '', tel: '', email: "", password: '', confirmation: '' }, setNewState);
   
    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    
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
        // Устанавливаем сообщение и показываем Alert
        setAlertMessage("Регисрация прошла успешно.");
        setAlertVariant('positive'); // Установите нужный вариант
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)

    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };


    return (
        <>
            <h2 className="text-3xl font-semibold ">Быстрая регистрация</h2>
            <div className="flex mt-6">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <p className="text-base ml-1">Быстрая регистрация</p>
            </div>
            <Alert
                isOpen={isShowAlert}
                onClose={handleCloseAlert}
                variant={alertVariant}
            >
                {alertMessage}
            </Alert>
            <form
                onSubmit={handleFormSubmit}
                method="dialog"
                className="sm:inline-flex flex-col lg:flex-wrap">
                <div className="inline-flex flex-col m-6">
                    
                    <Input
                        className={errors.name ? "border-red-500" : ""}
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                   
                    <Input
                        className={errors.email ? "border-red-500" : ""}
                        label="Телефон"
                        type="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        error={errors.tel}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                    
                    <Input
                        className={errors.email ? "border-red-500" : ""}
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                   
                    <Input
                        className={errors.password ? "border-red-500" : ""}
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                    
                        <Input
                    className={errors.password ? "border-red-500" : ""}
                    label="Confirmation"
                    type="password"
                    name="confirmation"
                    value={formData.confirmation}
                    onChange={handleChange}
                    error={errors.password}
                />
                </div>

                {/* <button type="submit" className="bg-blue-400 text-white p-3 rounded-md">Продолжить</button> */}
                <Button type="submit" variant="secondary">
                        Отправить
                    </Button>
            </form>

        </>

    );
}

export default Account;

