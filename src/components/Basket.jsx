import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import catalogueStore from "@/store/CatalogueStore"; // Импортируйте ваше MobX хранилище
import Product from "./Product/Product";

const Basket = observer(() => {
  useEffect(() => {
    catalogueStore.initializeBasket(); // Инициализация корзины при монтировании
}, []);
   // Загружаем сохраненные товары из localStorage при монтировании компонента
   useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
        const parsedBasket = JSON.parse(savedBasket);
        console.log("Загруженная корзина:", parsedBasket); // Отладочное сообщение
        catalogueStore.setBasket(parsedBasket);
         // Загружаем count из localStorage
         catalogueStore.updateCount();
    } else {
        console.log("Корзина пуста, нет данных в localStorage."); // Сообщение, если корзина пуста
    }
}, []);

  // // Сохраняем товары в localStorage при изменении корзины
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(catalogueStore.basket));
  }, [catalogueStore.basket]);

  return (
    <div>
      {catalogueStore.basket.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div >
          <ul >
            {catalogueStore.basket.map((item) => (
             
              <Product key={item.id} item ={item}/>
            ))}
          </ul>

        </div>
      )

      }
    </div>

  );
});

export default Basket;
