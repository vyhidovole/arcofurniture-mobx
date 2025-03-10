// import React, {useEffect } from "react";
// import { VscTrash } from "react-icons/vsc";
// import { observer } from "mobx-react-lite"; // Импортируем observer
// import catalogueStore from "@/store/CatalogueStore"; 

// export default function Product = observer(
//   ({item}) {
//     useEffect(() => {
//       catalogueStore.initializeBasket(); // Инициализация корзины после монтирования
//   }, []);
    
//     const { name, category, color, price, imgSrc,id, quantity } = item;
    
//     // Функция для сохранения total в localStorage
//     const saveTotalToLocalStorage = (total) => {
//       localStorage.setItem('total', total);
//     };
  
//     // Функция для получения total из localStorage
//     const loadTotalFromLocalStorage = () => {
//       const savedTotal = localStorage.getItem('total');
//       return savedTotal ? parseFloat(savedTotal) : 0;
//     };
  
//     const handleIncrement = () => {
//       catalogueStore.incrementProductQuantity(id); // Увеличиваем количество в store
//     };
  
//     const handleDecrement = () => {
//       if (quantity > 1) {
//         catalogueStore.decrementProductQuantity(id); // Уменьшаем количество в store
//       }
//     };
  
  
    
//     const numericPrice = parseFloat(price); // Преобразуем в число
     
//     useEffect(() => {
//       const initialTotal = loadTotalFromLocalStorage();
//       console.log(`Initial Total from localStorage: ${initialTotal}`);
//     }, []);
  
//      // Функция для обновления total
//      const updateTotal = () => {
//       const total = (numericPrice * catalogueStore.basket.find(product => product.id === id)?.quantity || 0).toFixed(2);
//       saveTotalToLocalStorage(total);
//     };
//      // Обновляем total при изменении количества товара
//      useEffect(() => {
//       updateTotal();
//     }, [catalogueStore.basket]);
  
//     const total = (numericPrice * catalogueStore.basket.find(product => product.id === id)?.quantity || 0).toFixed(2);
  
  
//      return (
//       <div className="flex  mb-4"> {/* Основной контейнер */}
//         <img width="100" src={imgSrc} alt={name} className="mr-4 object-contain" /> {/* Изображение с отступом справа */}
//         <div className="flex flex-col"> {/* Информация о продукте занимает оставшееся пространство */}
//           <h2 className="text-sm font-semibold">{name}</h2>
//           <p className="text-xs">Категория: {category}</p>
//           <div className='inline-flex'>
//             {Array.isArray(color) ? (
//               color.map((c, index) => ( // Используем c вместо item.color
//                 <div
//                   key={index}
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     backgroundColor: c,
//                     borderRadius: '10%', // Круглая форма для цвета
//                   }}
//                 ></div>
//               ))
//             ) : (
//               <div
//                 style={{
//                   width: '20px',
//                   height: '20px',
//                   backgroundColor: color,
//                   borderRadius: '10%',
//                 }}
//               ></div>
//             )}
//           </div>
//           <p className="text-xs">Цена: {numericPrice.toFixed(2)}</p> {/* Отображаем цену с двумя знаками после запятой */}
//           <p className="text-xs font-semibold">Всего: {total}</p> {/* Отображаем общую стоимость */}
//         </div>
//         <div className="flex flex-col items-center ml-4"> {/* Контейнер для кнопок */}
//           <div className="product-buttons flex items-center w-18 mx-auto"> {/* Flex для кнопок увеличения/уменьшения */}
//             <button
//               className="product-sub bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 disabled:bg-gray-300"
//               onClick={handleDecrement}
//               disabled={quantity === 1}
//             >
//               -
//             </button>
//             <h3 className="product-count mx-2 w-8 text-center">{quantity}</h3> {/* Отступ между кнопками и счетчиком */}
//             <button className="product-add bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"
//              onClick={handleIncrement}
//              >
//               +
//             </button>
//           </div>
//           <button 
//             className="mt-2 bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded hover:bg-gray-400" // Отступ сверху для кнопки удаления
//             onClick={() => catalogueStore.deleteProductFromBasket(item.id)}
//           >
//             <VscTrash />
//           </button>
//         </div>
//       </div>
     
//     );
//   }
  

// )
import React, { useEffect } from "react";
import { VscTrash } from "react-icons/vsc";
import { observer } from "mobx-react-lite"; // Импортируем observer
import catalogueStore from "@/store/CatalogueStore"; 

const Product = observer(({ item }) => {
  useEffect(() => {
    catalogueStore.initializeBasket(); // Инициализация корзины после монтирования
  }, []);

  const { name, category, color, price, imgSrc, id, quantity } = item;

  const handleIncrement = () => {
    catalogueStore.incrementProductQuantity(id); // Увеличиваем количество в store
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      catalogueStore.decrementProductQuantity(id); // Уменьшаем количество в store
    }
  };
  
  const numericPrice = parseFloat(price); // Преобразуем в число

  const total = (numericPrice * catalogueStore.basket.find(product => product.id === id)?.quantity || 0).toFixed(2);

  return (
    <div className="flex mb-4"> {/* Основной контейнер */}
      <img width="100" src={imgSrc} alt={name} className="mr-4 object-contain" /> {/* Изображение с отступом справа */}
      <div className="flex flex-col"> {/* Информация о продукте занимает оставшееся пространство */}
        <h2 className="text-sm font-semibold">{name}</h2>
        <p className="text-xs">Категория: {category}</p>
        <div className='inline-flex'>
          {Array.isArray(color) ? (
            color.map((c, index) => ( // Используем c вместо item.color
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: c,
                  borderRadius: '10%', // Круглая форма для цвета
                }}
              ></div>
            ))
          ) : (
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: color,
                borderRadius: '10%',
              }}
            ></div>
          )}
        </div>
        <p className="text-xs">Цена: {numericPrice.toFixed(2)}</p> {/* Отображаем цену с двумя знаками после запятой */}
        <p className="text-xs font-semibold">Всего: {total}</p> {/* Отображаем общую стоимость */}
      </div>
      <div className="flex flex-col items-center ml-4"> {/* Контейнер для кнопок */}
        <div className="product-buttons flex items-center w-18 mx-auto"> {/* Flex для кнопок увеличения/уменьшения */}
          <button
            className="product-sub bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 disabled:bg-gray-300"
            onClick={handleDecrement}
            disabled={quantity === 1}
          >
            -
          </button>
          <h3 className="product-count mx-2 w-8 text-center">{quantity}</h3> {/* Отступ между кнопками и счетчиком */}
          <button className="product-add bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <button 
          className="mt-2 bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded hover:bg-gray-400" // Отступ сверху для кнопки удаления
          onClick={() => catalogueStore.clearProduct(id)}
        >
          <VscTrash />
        </button>
      </div>
    </div>
  );
});

export default Product;
