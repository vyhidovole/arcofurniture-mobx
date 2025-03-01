import React from "react";
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { IoChevronDown } from "react-icons/io5";


// Компонент выпадающего меню для гостиной
const DropdownLiving = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
              <Button className= 'outline-transparent' size="sm"rightIcon={<IoChevronDown />}>
               ГОСТИНЫЕ
              </Button>
            </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <MenuItem value="модульные">Модульные</MenuItem>
        <MenuItem value="комплекты">Готовые комплекты</MenuItem>
        <MenuItem value="столы">Журнальные столы</MenuItem>
        <MenuItem value="полки">Полки</MenuItem>
        <MenuItem value="тумбы">Тумбы под ТВ</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropdownLiving;