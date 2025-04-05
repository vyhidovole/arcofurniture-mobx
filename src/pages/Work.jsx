// import React from "react";

// const Work = () => {
//     return <h3>This is Work page</h3>;
// }

// export default Work;
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import catalogueStore from "@/store/CatalogueStore"
import { useLoading } from '@/context/LoadingContext'; // Импортируйте хук контекста загрузки
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const Work = observer(() => {

    const { loading, setLoading } = useLoading(); // Получаем состояние загрузки

    useEffect(() => {
        const url = '/Work'; // Определяем конечный URL
        console.log('Запрос к API:', url)
        setLoading(true); // Устанавливаем состояние загрузки в true
        catalogueStore.getWorkItems(url).finally(() => {
            setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
        });
    }, [setLoading])
    // Проверяем, что Work определён и является массивом
    const workItems = Array.isArray(catalogueStore.workItems) ? catalogueStore.workItems : [];

    console.log('Работы:', workItems);
    // Итерация по данным и отрисовка карточек
    const renderData =
    workItems.length > 0 &&
    workItems.map((item) => (
       <>
       <h2 className="text-4xl">Наши работы</h2>
            <div key={item.id} className='relative border-2 border-blue-500 rounded-lg w-[750px] h-[485px] overflow-hidden
       '>

                <img
                    src={item.imgSrc || '/images/inst.jpg'}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"


                />
            </div>
       </>
        
        ))


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
                // Отображение Skeleton, пока данные загружаются
                Array.from({ length: 1 }).map((_, index) => (
                    <div key={index} className='relative border-2 border-blue-500 rounded-lg w-[550px] h-[285px] overflow-hidden'>
                        <Skeleton height="100%" />
                    </div>
                ))
            ) : (
                renderData
            )}
            
        </div>
    );
})

export default Work;