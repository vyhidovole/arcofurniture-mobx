import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Provider } from "@/components/ui/provider";

/* Корневой элемент страницы */
const App = ({ Component, pageProps }) => {
  return (
    <Provider>
<MainLayout>
      <Component {...pageProps} />
    </MainLayout>
   
    </Provider>
    
  );
};

export default App;
