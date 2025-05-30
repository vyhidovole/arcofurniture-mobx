import React from "react";
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { IoChevronDown } from "react-icons/io5";

/**
 * 
 *
 * @component
 * @returns {JSX.Element} Элемент выпадающего меню с различными вариантами  товаров.
 *
 
 */
// Компонент выпадающего меню для гостиной
const DropdownLiving = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button className='outline-transparent hover:cursor-pointer' size="sm" rightIcon={<IoChevronDown />}>
          ГОСТИНЫЕ
        </Button>
      </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <Link href="/drawing-room" passHref>
          <MenuItem value="модульные">Модульные</MenuItem>
        </Link>
        <MenuItem value="комплекты">Готовые комплекты</MenuItem>
        <MenuItem value="столы">Журнальные столы</MenuItem>
        <MenuItem value="полки">Полки</MenuItem>
        <MenuItem value="тумбы">Тумбы под ТВ</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropdownLiving;