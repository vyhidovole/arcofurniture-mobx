import React, { useState, } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@/components/Alert/Alert";



const Account = () => {
    const router = useRouter();
    //создаем один объект состоянияformData
    const [formData, setFormdata] = useState({ name: '', tel: '', email: '', password: '', confirmation: '' })
     const [alertVisible, setAlertVisible] = useState(false);
        const [alertMessage, setAlertMessage] = useState('');
        const [alertVariant, setAlertVariant] = useState('info');
    const handleChange = (e) => {
        const { name, value } = e.target//получаем имя и значение поля
        setFormdata({ ...formData, [name]: value })// обновляем только нужное поле
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        //Сохраняем данные в localStorage
        localStorage.setItem('formData', JSON.stringify(formData))
        console.log('Данные сохранены в localStorage:', formData)
        //очищаем поля формы, устанавливаем начальное состояние
        setFormdata({ name: '', tel: '', email: '', password: '', confirmation: '' })

         // Устанавливаем сообщение и показываем Alert
       setAlertMessage("Вы успешно зарегистрировались");
       setAlertVariant('positive'); // Установите нужный вариант
       setAlertVisible(true); 
       setTimeout(()=>{
        setAlertVisible(false)
       },3000) 
    }
    

    return (
        <>
            <h2 className="text-3xl font-semibold ">Быстрая регистрация</h2>
            <div className="flex mt-6">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <p className="text-base ml-1">Быстрая регистрация</p>
            </div>
            <Alert 
                isOpen={alertVisible} 
                
                variant={alertVariant}
            >
                {alertMessage}
            </Alert>
            <form
                onSubmit={handleSubmit}
                method="dialog"
                className="sm:inline-flex flex-col lg:flex-wrap">
                <div className="inline-flex flex-col m-6">
                    <label htmlFor="">ФИО</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ textAlign: 'center' }} // Центрируем текст
                        className="bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-violet-300 " />
                </div>
                <div className="inline-flex flex-col m-6">
                    <label htmlFor="">Телефон</label>
                    <input
                        type="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        style={{ textAlign: 'center' }} // Центрируем текст
                        className="bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-violet-300 " />
                </div>
                <div className="inline-flex flex-col m-6">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ textAlign: 'center' }} // Центрируем текст
                        className="bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-violet-300 " />
                </div>
                <div className="inline-flex flex-col m-6">
                    <label htmlFor="">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ textAlign: 'center' }} // Центрируем текст
                        className="bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-violet-300 " />
                </div>
                <div className="inline-flex flex-col m-6">
                    <label htmlFor="">Подтвердите пароль</label>
                    <input
                        type="password"
                        name="confirmation"
                        value={formData.confirmation}
                        onChange={handleChange}
                        style={{ textAlign: 'center' }} // Центрируем текст
                        className="bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-violet-300 " />
                </div>

                <button type="submit" className="bg-blue-400 text-white p-3 rounded-md">Продолжить</button>
            </form>

        </>

    );
}

export default Account;

