import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer 
        className="bg-blue-950 px-0 pt-16 pb-6 mt-14 w-full">
            <div
             className="container footer-flex flex justify-around items-start ">

                <div 
                className="flex-container inline-flex flex-col">
                <Image src={"/images/logo.jpg"} alt="арко" width={167} height={30} priority={true} />
                <h3
                 className="title-footer text-white bold pb-4 mt-6">8-961-925-6161
                 </h3>
                <p 
                className="text-sm font-thin text-white mb-4 ">Время работы:      
                <span className=" text-white bold pb-4">c 10:00 до 19:00</span>
                </p>
                <p
                 className="text-sm font-thin text-white mb-4 ">
                    Адрес:
                     <span className=" text-white bold pb-4">ул. Московская 144 корп-1</span>
                </p>
                <a 
                className="text-sm font-thin text-white mb-4 "href="#">Почта: mebelarko@mail.ru
                </a>
                    
                <h3 
                className="title-footer text-white bold pb-4 mt-6">Мы в Инстограмме
                </h3>
                <a
                 href=""><Image src={"/images/inst.jpg"} alt="арко" width={80} height={80} priority={true} />
                 </a>
                <a 
                className="text-sm font-thin text-white mt-4 " href="#">© Все права защищены.
                </a>



                </div>
                <div
                 className="flex-container inline-flex flex-col">
                    <h3 className="title-footer text-white bold pb-4">Кухни</h3>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4 " href="#">Маленькие кухни </a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Гтовые комплекты</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Модульные кухни</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Куханный угол</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Угловые кухни</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Стулья для кухни</a>
                </div>
                <div
                 className="flex-container inline-flex flex-col text-nowrap">
                    <h3 className="title-footer text-white bold pb-4">Гостинные</h3>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Модульные</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Журнальные столы</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Полки</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Тумбы под ТВ</a>
                </div>
                <div
                 className="flex-container inline-flex flex-col text-nowrap">
                    <h3 className="title-footer text-white bold pb-4">Спальни</h3>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Кровати</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Матрацы</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Шкафы</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Комоды</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Столы туалетные</a>
                </div>
                <div 
                className="flex-container inline-flex flex-col text-nowrap">
                    <h3 className="title-footer text-white bold pb-4">Диваны</h3>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Прямые</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Угловые</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">На металлокаркасе</a>
                    <a target="_blank" className="support text-sm font-thin text-white mb-4" href="#">Кресла</a>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer