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


// Компонент выпадающего меню для шкафов-купе
const DropdownCuboard = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button className='outline-transparent hover:cursor-pointer' size="sm" rightIcon={<IoChevronDown />}>
          ШКАФЫ-КУПЕ
        </Button>
      </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <Link href="/cupboard" passHref>
          <MenuItem value="кухни">Модульные кухни</MenuItem>
        </Link>
        <MenuItem value="комплекты">Готовые комплекты</MenuItem>
        <MenuItem value="маленькие">Маленькие кухни</MenuItem>
        <MenuItem value="угловые">Угловые кухни</MenuItem>
        <MenuItem value="уголки">Кухонные уголки</MenuItem>
      </MenuContent>
    </MenuRoot >
  );
};

export default DropdownCuboard;