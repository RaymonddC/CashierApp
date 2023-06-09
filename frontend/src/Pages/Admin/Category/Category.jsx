import React, { useEffect } from 'react';
import { Sidebar } from '../../../Components/Sidebar/Sidebar';
import { CardCategory } from '../../../Components/FilterProduct/CardCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync } from '../../../Features/Category/CategorySlice';

export const Category = () => {
  const category = useSelector((state) => state.category.list);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="content px-[30px] w-full  scrollbar-hide  md:scrollbar-default">
        <div className="py-[50px]">test</div>
        <div className="header flex justify-between w-full">
          <p className="font-bold py-[10px] text-[50px]">Categories</p>
          <button type="submit" className="bg-[#FFCA40]  rounded-xl py-[5px] px-[30px]  my-[20px]">
            (+icon) Add Category
          </button>
        </div>
        <div className="list grid grid-cols-4 gap-[40px] ">
          {category.map((value, key) => {
            return <CardCategory index={key} category={value} />;
          })}
        </div>
      </div>
    </div>
  );
};
