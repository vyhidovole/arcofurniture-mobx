import React, { useEffect } from "react";
import { observer } from "mobx-react";
import catalogueStore from "@/store/CatalogueStore"
import { useLoading } from '@/context/LoadingContext'; // Импортируйте хук контекста загрузки
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const Catalogue = observer(() => {

  const { loading, setLoading } = useLoading(); // Получаем состояние загрузки

  useEffect(() => {
    const url = '/CatalogueProducts'; // Определяем конечный URL
    setLoading(true); // Устанавливаем состояние загрузки в true
    catalogueStore.getProducts(url).finally(() => {
      setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
    });
  }, [setLoading])
  // Итерация по данным и отрисовка карточек
  const renderData =
    catalogueStore.products.length > 0 &&
    catalogueStore.products.map((item) => (
      <div key={item.id} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[185px] overflow-hidden
       '>

        <img
          src={item.imgSrc || '/path/to/default-image.jpg'}
          alt={item.name}
           className="absolute inset-0 w-full h-full object-cover"
          

        />
        
        <button
          className="text-white bg-sky-800 absolute px-6 py-1 rounded-sm bottom-0 left-0">
          {item.name}
        </button>
      </div>
    ))


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {loading ? (
        // Отображение Skeleton, пока данные загружаются
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[185px] overflow-hidden'>
            <Skeleton height="100%" />
          </div>
        ))
      ) : (
        renderData
      )}
      {/* {renderData} */}
    </div>
  );
})

export default Catalogue;