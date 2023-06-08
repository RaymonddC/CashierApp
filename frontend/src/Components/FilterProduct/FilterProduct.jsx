import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync } from '../../Features/Category/CategorySlice';
import { CardCategory } from './CardCategory';

export const FilterProduct = () => {
  const category = useSelector((state) => state.category.list);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  return (
    <div className="">
      <div className="content flex h-[150px] gap-[30px]">
        {category.map((value) => {
          return <CardCategory />;
        })}
      </div>
    </div>
  );
};
