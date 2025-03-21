import React, { useEffect,useState } from "react";
import { observer } from "mobx-react-lite";
import catalogueStore from "@/store/CatalogueStore"; 
import Alert from "@/components/Alert/Alert";
import { useCart } from '@/context/CartContext'; 

const Couch = observer(() => { 
   const {  addToCart } = useCart(); // Используем контекст
  // Стейт для закрытия компонента уведомления
  const [isShowAlert, setShowAlert] = useState(false);
  useEffect(() => {
    console.log("isShowAlert изменился на:", isShowAlert);
}, [isShowAlert]);
  // const { products, basket } = catalogueStore; // Получаем продукты и корзину из store
  const products = catalogueStore.products; // Предполагаем, что у вас есть массив продуктов
  // Функция для добавления товара в корзину
  const handleAddToBasket = (item) => {
    catalogueStore.addProductToBasket(item); // Добавляем продукт в корзину
    addToCart()
    console.log(`${item.name} добавлен в корзину!`);
    setShowAlert(true); // Показываем алерт
    console.log("Показать алерт:", true); // Логируем изменение состояния
    setTimeout(() => {
      setShowAlert(false); // Скрываем алерт
  }, 3000); 
};
  useEffect(() => {
    const url = '/Couch'; // Определяем конечный URL 
    catalogueStore.getProducts(url);
  }, []);
 
  // Итерация по данным и отрисовка карточек
  const renderData =
    catalogueStore.products.length > 0 &&
    catalogueStore.products.map((item) => (
      <div key={item.id} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[300px] p-2'>
        <img
          src={item.imgSrc || '/path/to/default-image.jpg'}
          alt={item.name}
          className="rounded-lg w-full h-auto"
        />
        <h2>{item.name || 'Нет имени'}</h2>
        <p>{item.category || 'Нет категории'}</p>
        <div className='inline-flex'>
          {Array.isArray(item.color) ? (
            item.color.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  borderRadius: '10%',
                }}
              ></div>
            ))
          ) : (
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: item.color || 'gray', // Цвет по умолчанию
                borderRadius: '50%',
              }}
            ></div>
          )}
        </div>
        <p>{item.price || 'Нет цены'}</p>
        <button
          className="text-white bg-sky-800   px-6 py-1 rounded-sm "
           onClick={() => handleAddToBasket(item)} >
          купить
        </button>
      </div>
    ));
    console.log("Текущая корзина:", catalogueStore.basket);
    console.log(catalogueStore.products); // Логируем продукты для отладки
    console.log("Количество уникальных товаров в корзине:", catalogueStore.quantity); // Логируем количество уникальных товаров

    return (
      <>
     <div className="grid grid-cols-2 gap-6 relative lg:grid lg:grid-cols-4 lg:gap-6 ">
        {renderData}
      </div>
      {isShowAlert && (
        <Alert
          variant="positive"
          isOpen={isShowAlert}
          onClose={() => setShowAlert(false)}
        >
          <p>Товар добавлен в корзину!</p>
        </Alert>
      )}
     </>
      
    );
  });
  
  export default Couch;