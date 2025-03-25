import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";
import MenuBar from "@/components/MenuBar";
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext'; 




/* Корневой элемент страницы */
const App = ({ Component, pageProps }) => {
 
  return (
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


  );
};

export default App;
