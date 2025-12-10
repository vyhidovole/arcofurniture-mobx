import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"
import Header from "@/components/Header";
/**
 * Обертка контента основной страницы.
 * Этот компонент служит контейнером для навигации, заголовка, основного контента и подвала.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, которые будут отображаться в основном контенте.
 * @returns {JSX.Element} Элемент, представляющий основную разметку страницы.
 *
 * @example
 * <MainLayout>
 *   <YourContentComponent />
 * </MainLayout>
 */

const MainLayout = ({children}) => {
  return (
    <main>
      <Navigation />
      <Header/>
      <div className="container p-4">{children}</div>
      <Footer/>
    </main>
  );

};

export default MainLayout;





  

