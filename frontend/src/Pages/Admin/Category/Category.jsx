import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../Components/Layout/Sidebar/Sidebar';
import { CardCategory } from '../../../Components/FilterProduct/CardCategory';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategoriesAsync, postCategoryAsync } from '../../../Features/Category/CategorySlice';
import KeepMountedModal from '../../../Components/Modal/KeepMountedModal';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';

import { CategoryForm } from '../../../Components/CategoryForm/CategoryForm';

export const Category = () => {
  const category = useSelector((state) => state.category.list);
  let dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  return (
    <div className="content px-[30px] w-full  scrollbar-hide  md:scrollbar-default">
      <div className="py-[50px]">test</div>
      <div className="header flex flex-col py-[10px] justify-between w-full md:flex-row">
        <p className="font-bold  text-[50px]">Categories</p>
        <button onClick={() => (openAdd ? '' : setOpenAdd(!openAdd))} className="bg-[#FFCA40]  rounded-xl py-[5px] px-[30px]  my-[20px]">
          <KeepMountedModal icon={<AddIcon />} button={<span>Add Category</span>} open={openAdd} setOpen={setOpenAdd} formBox={<CategoryForm handleClose={() => setOpenAdd(false)} category={selected} />} />
        </button>
      </div>
      <div className="list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px] ">
        {category.map((value, key) => {
          return (
            <div className="relative">
              <div
                className="btn"
                onClick={() => {
                  setOpenAdd(true);
                  setSelected(value);
                }}
              >
                <CardCategory index={key} category={value} />
              </div>
              <div
                className="absolute bottom-10 right-10 text-red-900 z-30"
                onClick={() => {
                  dispatch(deleteCategory({ id: value.id }));
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
