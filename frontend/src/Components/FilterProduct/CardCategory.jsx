import React from 'react';

export const CardCategory = () => {
  return (
    <div className="border shadow-md rounded-[50px] h-[400px] justify-center flex flex-col p-[30px] pb-[30px]  hover:bg-[#FFCA40] gap-12">
      <div className="image flex h-[50%] justify-center">
        <img className="flex" src="http://localhost:5000/category_image/580b57fbd9996e24bc43c090.png" alt="" />
      </div>
      <div className="desc flex flex-col text-center">
        <p className="text-[30px] font-bold">Drinks</p>
        {/* <p>a</p> */}
      </div>
    </div>
  );
};
