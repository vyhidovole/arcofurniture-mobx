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

// Компонент выпадающего меню для диванов
const DropdownCouch = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
             <Button className= 'outline-transparent hover:cursor-pointer' size="sm"rightIcon={<IoChevronDown />}>
              ДИВАНЫ
             </Button>
           </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
      <Link href="/couch" passHref>
        <MenuItem value="прямые">Прямые</MenuItem>
        </Link>
        <MenuItem value="угловые">Угловые</MenuItem>
        <MenuItem value="металл">На металлокаркасе</MenuItem>
        <MenuItem value="кресла">Кресла</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropdownCouch;