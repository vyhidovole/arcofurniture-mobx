import React, { useEffect } from "react";
import { useLoading } from '@/context/LoadingContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Dropdown from "../components/Dropdown/Dropdown";
import DropdownCupboard from "../components/Dropdown/DropdownCupboard";
import DropdownLiving from "../components/Dropdown/DropdownLiving";
import DropdownBaby from "../components/Dropdown/DropdownBaby";
import DropdownBedroom from "../components/Dropdown/DropdownBedroom";
import DropdownCouch from "../components/Dropdown/DropdownCouch";
import DropdownLobby from "../components/Dropdown/DropdownLobby";


const MenuBar = () => {
  const { loading, setLoading } = useLoading(); // Получаем состояние загрузки

  // Пример эффекта для имитации загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Имитация задержки для загрузки данных
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунды
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  return (
    <div className="hidden lg:flex justify-around w-full h-14 bg-teal-500 py-4 my-2 font-bold relative mb-6">
        {loading ? (
            // Если данные загружаются, показываем скелетон для всего контейнера
            <Skeleton height={56} width="100%" />
        ) : (
            // Если данные загружены, показываем компоненты Dropdown
            <div className="flex justify-around w-3/4">
                <Dropdown />
                <DropdownLiving />
                <DropdownBaby />
                <DropdownBedroom />
                <DropdownCouch />
                <DropdownLobby />
                <DropdownCupboard />
            </div>
        )}
    </div>
);
};


export default MenuBar;