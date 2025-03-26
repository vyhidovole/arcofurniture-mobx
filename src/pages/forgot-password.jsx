import React, { useState, } from "react"
import Link from "next/link";
import useForm from "@/hooks/useForm";
import Alert from "@/components/Alert/Alert";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";


const Password = (setNewState) => {

    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        { email: "", }, setNewState);




    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');

    // const handleChange = (e) => setEmail(e.target.value)
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
        setAlertMessage("Новый пароль был выслан на ваш адрес электронной почты.");
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
            <h2 className="text-3xl font-semibold ">Забыли пароль?</h2>
            <div className="flex">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>-
                <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
                -
                <p className="text-base ml-1">Забыли пароль?</p>
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
                // onSubmit={handleSubmit}
                method="dialog"
            >
                <div className="inline-flex flex-col mt-6">

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
                <div className="mt-6">
                    <Link href="/privetofficepage" className="bg-zinc-300 px-4 py-2 rounded-lg mr-3">назад</Link>

                    {/* <button type="submit" className="bg-zinc-300 px-4 py-2 rounded-lg m-3">продолжить</button> */}
                    <Button type="submit" variant="secondary">
                        Отправить
                    </Button>
                </div>

            </form>

        </>

    );
}

export default Password;

