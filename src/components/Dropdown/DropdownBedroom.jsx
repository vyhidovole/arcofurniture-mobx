import React from "react";
import { Button } from "@chakra-ui/react"
import Link from "next/link";
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

// Компонент выпадающего меню для спальни
const DropdownBedroom = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button className='outline-transparent hover:cursor-pointer' size="sm" rightIcon={<IoChevronDown />}>
          СПАЛЬНИ
        </Button>
      </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <Link href="/bedroom" passHref>
          <MenuItem value="кровати">Кровати</MenuItem>
        </Link>
        <MenuItem value="матрыцы">Матрацы</MenuItem>
        <MenuItem value="шкафы">Шкафы</MenuItem>
        <MenuItem value="комоды">Комоды</MenuItem>
        <MenuItem value="зеркала">Зеркала</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropdownBedroom;