import React from "react";
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { IoChevronDown } from "react-icons/io5";



// Компонент выпадающего меню
const Dropdown = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button className= 'outline-transparent' size="sm"rightIcon={<IoChevronDown />}>
         КУХНИ
        </Button>
      </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <MenuItem value="кухни">Модульные кухни</MenuItem>
        <MenuItem value="комплекты">Готовые комплекты</MenuItem>
        <MenuItem value="Маленькие">Маленькие кухни</MenuItem>
        <MenuItem value="Угловые">Угловые кухни</MenuItem>
        <MenuItem value="уголки">Кухонные уголки</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default Dropdown;