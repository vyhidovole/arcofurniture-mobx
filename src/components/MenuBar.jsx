import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import DropdownCupboard from "../components/Dropdown/DropdownCupboard";
import DropdownLiving from "../components/Dropdown/DropdownLiving";
import DropdownBaby from "../components/Dropdown/DropdownBaby";
import DropdownBedroom from "../components/Dropdown/DropdownBedroom";
import DropdownCouch from "../components/Dropdown/DropdownCouch";
import DropdownLobby from "../components/Dropdown/DropdownLobby";


const MenuBar = () => {
    return ( 
        <>
        <div className=" flex justify-around w-full h-14 bg-teal-500 py-4 my-2 font-bold relative mb-6">
        <div className=" flex justify-around w-3/4">
        <Dropdown></Dropdown>
        <DropdownLiving></DropdownLiving>
        <DropdownBaby></DropdownBaby>
        <DropdownBedroom></DropdownBedroom>
        <DropdownCouch></DropdownCouch>
        <DropdownLobby></DropdownLobby>
        <DropdownCupboard></DropdownCupboard>
      </div>
        </div>
         
        </>
       
     );
}
 
export default MenuBar;