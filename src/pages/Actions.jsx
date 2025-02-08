import React from "react";
import { CiGrid41 } from "react-icons/ci";
import CustomSlider2 from '@/components/Slider/CustomSlider2';



const Actions = () => {
  return (
    <>
    <div className="bg-gray-400 w-40 p-4 font-medium text-lg text-white rounded-md flex justify-around mb-6">
      <CiGrid41 />
      <h2 className="text-base">Акции</h2>
      </div>
      {/* Slider Component */}
      
      <CustomSlider2 />
    </>
  
)
};

export default Actions;
