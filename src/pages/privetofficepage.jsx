import React, { useState, } from "react"
import Link from "next/link";
import ModalPrivetOffice from "@/components/Modal/ModalPrivetOffice";

const PrivetOffice = () => {
    const [isEntryModalOpen, setEntryModalOpen] = useState(true); // Состояние для ModalPrivetOffice


    const closeEntryDialog = () => {
        setEntryModalOpen(false); // Закрываем модальное окно для входа
    };
    return (
        <>
        <div className="flex mt-6 ">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
                -
                <p className="text-base ml-1">Авторизация</p>

            </div>
            
            <ModalPrivetOffice show={isEntryModalOpen} onClose={closeEntryDialog} />{/* Добавляем форму */}

        </>

    );
}

export default PrivetOffice