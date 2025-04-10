import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";
import MenuBar from "@/components/MenuBar";
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext'; 
import { LoadingProvider } from '@/context/LoadingContext';



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
