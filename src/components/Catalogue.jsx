import React, { useEffect } from "react";
import { observer } from "mobx-react";
import catalogueStore from "@/store/CatalogueStore"



const Catalogue = observer(() => {

  useEffect(() => {
    const url = '/CatalogueProducts'; // Определяем конечный URL
    catalogueStore.getProducts(url)
  }, [])
  // Итерация по данным и отрисовка карточек
  const renderData =
    catalogueStore.products.length > 0 &&
    catalogueStore.products.map((item) => (
      <div key={item.id} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[168px]
       '>

        <img src={item.imgSrc || '/path/to/default-image.jpg'}
         alt={item.name}
         className="absolute rounded-lg"
         
       />
        <button
          className="text-white bg-sky-800 absolute  px-6 py-1 rounded-sm top-28 left-5 ">
          {item.name}
        </button>
      </div>
    ))


  return (
    <div className="grid grid-cols-4 gap-6">
      {renderData}
    </div>
  );
})

export default Catalogue;