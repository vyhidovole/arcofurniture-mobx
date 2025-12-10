'use client'
import "@/styles/globals.css";
import React,{useEffect} from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";
import MenuBar from "@/components/MenuBar";
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext'; 
import { LoadingProvider } from '@/context/LoadingContext';
import catalogueStore from "@/store/CatalogueStore";


/**
 * Корневой элемент страницы.
 * Этот компонент оборачивает все страницы приложения в необходимые провайдеры
 * и предоставляет общий макет для всех страниц.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ElementType} props.Component - Компонент страницы, который будет рендериться.
 * @param {Object} props.pageProps - Свойства, передаваемые компоненту страницы.
 * @returns {JSX.Element} Элемент, представляющий корневой компонент приложения.
 *
 * @example
 * <App Component={MyPage} pageProps={myPageProps} />
 */

const App = ({ Component, pageProps }) => {
   useEffect(() => {
    try {
      catalogueStore.initializeBasket(); // Единственный вызов — загружает из localStorage, парсит и обновляет setBasket + quantity
      console.log("Инициализация корзины в App завершена"); // Для отладки
    } catch (error) {
      console.error('Ошибка инициализации корзины в App:', error);
      // Опционально: catalogueStore.setBasket([]); // Fallback на пустую корзину
    }
  }, []); // Пустой deps — срабатывает только при монтировании
     // Загружаем сохраненные товары из localStorage при монтировании компонента
  //    useEffect(() => {
  //     const savedBasket = localStorage.getItem("basket");
  //     if (savedBasket) {
  //         const parsedBasket = JSON.parse(savedBasket);
  //         console.log("Загруженная корзина:", parsedBasket); // Отладочное сообщение
  //         catalogueStore.setBasket(parsedBasket);
  //          // Загружаем count из localStorage
  //         //  catalogueStore.updateCount();
  //     } else {
  //         console.log("Корзина пуста, нет данных в localStorage."); // Сообщение, если корзина пуста
  //     }
  // }, []);
 
  return (
    <LoadingProvider>
    <ThemeProvider>
      <Provider>
        <CartProvider>
          <MainLayout>
            <MenuBar />
            <Component {...pageProps} />
          </MainLayout>
        </CartProvider>
      </Provider>
    </ThemeProvider>
    </LoadingProvider>


  );
};

export default App;
