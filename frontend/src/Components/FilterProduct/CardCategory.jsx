import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, getDataProduct } from '../../Features/product/productSlice';
import { useSearchParams } from 'react-router-dom';

export const CardCategory = (props) => {
  const dispatch = useDispatch();

  const [pageParams, setPageParams] = useSearchParams();
  const [page, setPage] = useState(1);

  return (
    <div
      // onClick={() => {
      //   // dispatch(changeFilter({ category_id: props.category.id }));
      //   // if (pageParams.get('page') === null) {
      //   //   setPageParams(`page=1`);
      //   // }
      //   // dispatch(getDataProduct(pageParams.get('page')));
      //   // setPage(Number(pageParams.get('page')));
      // }}
      className={`border shadow-md rounded-[3em] h-[25em] max-h-[95%]  justify-center flex flex-col p-[2em] pt-[3em]  hover:bg-[#FFCA40] gap-[1em]  ${props.class} `}
    >
      <div className="image px-[10%] max-h-[100%] flex justify-center">
        <img className="max-h-[100%]" src={`http://localhost:5000/category_image/${props.category?.category_image}`} alt="" />
      </div>
      <div className="desc flex flex-col text-center">
        <p className="text-[1.5em] font-bold">{props.category?.category_name}</p>
        {/* <p>a</p> */}
      </div>
    </div>
  );
};
