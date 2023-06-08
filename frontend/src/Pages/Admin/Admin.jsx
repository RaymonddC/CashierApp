import { useEffect, useState } from 'react';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { getDataProduct } from '../../Features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card/Card';
import AddIcon from '@mui/icons-material/Add';
// paginate
import { Pagination } from '@mui/material';
// Loader
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useSearchParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { FilterProduct } from '../../Components/FilterProduct/FilterProduct';

export default function Admin() {
  const [pageParams, setPageParams] = useSearchParams();

  const dispatch = useDispatch();
  const { dataProduct, pageCount, isLoad } = useSelector((state) => state.product);

  console.log(pageParams.get('page'));

  const [page, setPage] = useState(1);

  const changeHandler = (event, value) => {
    setPageParams(`page=${value}`);
  };

  useEffect(() => {
    if (pageParams.get('page') === null) {
      setPageParams(`page=1`);
    }
    dispatch(getDataProduct(pageParams.get('page')));
    setPage(Number(pageParams.get('page')));
  }, [pageParams]);

  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full h-[100vh] p-9 flex flex-col justify-between">
        {isLoad ? (
          <div className="h-[100vh] flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <FilterProduct />
            <div className="flex justify-end">
              <button className="p-2 bg-[#FF2351] text-white font-bold rounded-lg flex items-center mb-5 gap-1 text-[14px]">
                <AddIcon />
                ADD PRODUCT
              </button>
            </div>
            <Card data={dataProduct} />

            <div className="flex justify-center">
              <Pagination count={pageCount} page={page} onChange={changeHandler} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
