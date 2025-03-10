import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";
import MenuBar from "@/components/MenuBar";

/* Корневой элемент страницы */
const App = ({ Component, pageProps }) => {
  return (
    <Provider>
<MainLayout>
<MenuBar />
      <Component {...pageProps} />
    </MainLayout>
   
    </Provider>
    
  );
};

export default App;
