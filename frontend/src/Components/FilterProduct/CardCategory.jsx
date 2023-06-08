import React from 'react';

export const CardCategory = () => {
  return (
    <div className="border shadow-md rounded-[3em] h-[25em] max-h-[100%] justify-center flex flex-col p-[2em] pb-[2em]  hover:bg-[#FFCA40] gap-[1em] ">
      <div className="image flex w-[100%] px-[10%] justify-center">
        <img className="flex" src="http://localhost:5000/category_image/580b57fbd9996e24bc43c090.png" alt="" />
      </div>
      <div className="desc flex flex-col text-center">
        <p className="text-[2em] font-bold">Drinks</p>
        {/* <p>a</p> */}
      </div>
    </div>
  );
};
