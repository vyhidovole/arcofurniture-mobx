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


// Компонент выпадающего меню для детских товаров
const DropdownBaby = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button className='outline-transparent' size="sm" rightIcon={<IoChevronDown />}>
          ДЕТСКИЕ
        </Button>
      </MenuTrigger>
      <MenuContent className="bg-white p-5 font-light rounded-sm">
        <Link href="/nursery" passHref>
          <MenuItem value="кровати">Кровати</MenuItem>
        </Link>
        <MenuItem value="полки">Полки</MenuItem>
        <MenuItem value="столы">Столы</MenuItem>
        <MenuItem value="шкафы">Шкафы</MenuItem>
        <MenuItem value="комоды">Комоды</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropdownBaby;