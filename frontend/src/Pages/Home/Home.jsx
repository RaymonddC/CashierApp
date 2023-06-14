import { useEffect, useState } from 'react';
import { getDataProduct, setDataProductById } from '../../Features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card/Card';
import { FilterProduct } from '../../Components/FilterProduct/FilterProduct';

// paginate
import { Pagination } from '@mui/material';
// Loader
import { Navigate, useSearchParams } from 'react-router-dom';
// Modal
import { convertIdr } from '../../helper/convertCurrency';
import OrderMenuCard from '../../Components/orderMenuCard/orderMenuCard';
import { deleteOrderMenu } from '../../Features/OrderMenu/OrderMenuSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { createTransaction } from '../../Features/Transaction/transactionSlice';

export default function Admin() {
  const [pageParams, setPageParams] = useSearchParams();

  const dispatch = useDispatch();
  const { dataProduct, pageCount, isLoad } = useSelector((state) => state.product);

  const { subTotal } = useSelector((state) => state.orderMenu);

  // console.log(pageParams.get('page'));

  // paginate
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category_id: null,
    ordered: 'ASC',
    orderedBy: '',
    search: '',
  });

  const changeHandler = (event, value) => {
    setPageParams(`page=${value}`);
  };

  if (Number(pageParams.get('page')) > pageCount && pageCount !== 0) {
    setPageParams(`page=1`);
  }

  const [openOrder, setOpenOrder] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setDataProductById({}));
  };

  // console.log(window.location.pathname);

  // console.log(dataProduct[0].product_image);

  const submitHandler = () => {
    dispatch(createTransaction(new Date(), subTotal));
    dispatch(deleteOrderMenu(localStorage.getItem('userId')));
  };

  useEffect(() => {
    if (pageParams.get('page') === null) {
      setPageParams(`page=1`);
    }
    setPage(Number(pageParams.get('page')));
    dispatch(getDataProduct(pageParams.get('page'), filter));
    // console.log("filterUpdate ==================");
    console.log("masuk hehe");
  }, [pageParams, filter]);

  return (
    <div className="flex bg-[#f0f0f0]">
      <div className="w-full h-[100vh] p-9 flex flex-col justify-between">
        <FilterProduct filter={filter} setFilter={setFilter} />
        <Card
          data={dataProduct}
          currentPage={pageParams.get('page')}
          // handleOpen={handleOpen}
        />
        <div className="flex justify-center">
          <Pagination count={pageCount} page={page} onChange={changeHandler} />
        </div>
      </div>
      <div className={`bg-white p-9 flex flex-col justify-between box-border absolute h-[100vh] right-0 ${openOrder ? '' : 'hidden'} `}>
        <div className="headerOrder flex justify-between align-middle items-center">
          <h1 className="text-[24px] font-bold">Order Menu</h1>
          <CloseRoundedIcon onClick={() => setOpenOrder(false)} />
        </div>
        <OrderMenuCard />
        <div className="flex flex-col justify-center">
          <div className="border-dashed border-t-2 border-gray-400 pt-2 flex justify-between mb-10">
            <p className="font-bold">Sub Total</p>
            <p className="font-bold">{convertIdr(subTotal)}</p>
          </div>
          <button className="bg-[#ffca40] py-5 px-6 w-[338px] rounded-lg font-bold" onClick={submitHandler}>
            ORDER NOW
          </button>
        </div>
      </div>
      <div
        className={`iconOrder absolute right-[5%] bottom-[5%] rounded-full h-[50px] w-[50px] drop-shadow-lg flex justify-center items-center bg-white
       ${openOrder ? 'hidden' : ''}
      `}
        onClick={() => setOpenOrder(true)}
      >
        <ShoppingCartOutlinedIcon />
      </div>
    </div>
  );
}
