import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";
import MenuBar from "@/components/MenuBar";
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext'; 
import { LoadingProvider } from '@/context/LoadingContext';



/* Корневой элемент страницы */
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
