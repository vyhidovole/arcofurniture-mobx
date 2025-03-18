import React from "react";
import { CiMenuBurger } from "react-icons/ci"

const BurgerButton = ({ onClick }) => {

  return (

    <button className="block lg:hidden p-4" onClick={onClick}>
      <CiMenuBurger />
      <p>Меню</p>
    </button>
  );
};

export default BurgerButton;
