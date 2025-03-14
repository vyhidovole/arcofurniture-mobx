import React, { useState, } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@/components/Alert/Alert";


const Password = () => {
    //  const router = useRouter();
    const [email, setEmail] = useState('')
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    
    const handleChange=(e)=>setEmail(e.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()
        //создаем объект с данными для отправки
        const formDta = {
            email: email,
        }

        //записывает данные в localStorage
        localStorage.setItem("formData", JSON.stringify(formDta))
        console.log("Данные сохранены в localStorage:", formDta)
       
       //очищаем поле
       setEmail('')
    //    setTimeout(()=>{
    //      alert("Новый пароль был выслан на ваш адрес электронной почты.")
    //    },0)
       
       // Устанавливаем сообщение и показываем Alert
       setAlertMessage("Новый пароль был выслан на ваш адрес электронной почты.");
       setAlertVariant('positive'); // Установите нужный вариант
       setAlertVisible(true); 
       setTimeout(()=>{
        setAlertVisible(false)
       },3000) 

    }

    const handleCloseAlert = () => {
        setAlertVisible(false);
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
                isOpen={alertVisible} 
                onClose={handleCloseAlert} 
                variant={alertVariant}
            >
                {alertMessage}
            </Alert>

            <form
                onSubmit={handleSubmit}
                method="dialog"
            >
                <div className="inline-flex flex-col mt-6">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email} 
                        onChange={handleChange}
                        className="text-center outline-none bg-zinc-300  rounded-lg "
                    />
                </div>
                <div className="mt-6">
                    <Link href="/privetofficepage"  className="bg-zinc-300 px-4 py-2 rounded-lg mr-3">назад</Link>
                    
                    <button type="submit" className="bg-zinc-300 px-4 py-2 rounded-lg m-3">продолжить</button>
                </div>

            </form>

        </>

    );
}

export default Password;

