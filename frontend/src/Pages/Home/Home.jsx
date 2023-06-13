import { useEffect, useState } from "react";
import {
  getDataProduct,
  setDataProductById,
} from "../../Features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card/Card";

// paginate
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { convertIdr } from "../../helper/convertCurrency";
import OrderMenuCard from "../../Components/orderMenuCard/orderMenuCard";
import { deleteOrderMenu } from "../../Features/OrderMenu/OrderMenuSlice";

export default function Admin() {
  const [pageParams, setPageParams] = useSearchParams();

  const dispatch = useDispatch();
  const { dataProduct, pageCount, isLoad } = useSelector(
    (state) => state.product
  );

  const { subTotal } = useSelector((state) => state.orderMenu);

  // console.log(pageParams.get('page'));

  // paginate
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category_id: null,
    ordered: "ASC",
    orderedBy: "",
    search: "",
  });

  const changeHandler = (event, value) => {
    setPageParams(`page=${value}`);
  };

  if (Number(pageParams.get("page")) > pageCount && pageCount !== 0) {
    setPageParams(`page=1`);
  }

  // modal
  const style = {
    borderRadius: 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setDataProductById({}));
  };

  // console.log(window.location.pathname);

  // console.log(dataProduct[0].product_image);

  useEffect(() => {
    if (pageParams.get("page") === null) {
      setPageParams(`page=1`);
    }
    dispatch(getDataProduct(pageParams.get("page"), filter));
    setPage(Number(pageParams.get("page")));
    // console.log("filterUpdate ==================");
  }, [pageParams, filter]);

  return (
    <div className="flex bg-[#f0f0f0]">
      <div className="w-full h-[100vh] p-9 flex flex-col justify-between">
        {/* <FilterProduct filter={filter} setFilter={setFilter} /> */}
        <Card
          data={dataProduct}
          currentPage={pageParams.get("page")}
          // handleOpen={handleOpen}
        />
        <div className="flex justify-center">
          <Pagination count={pageCount} page={page} onChange={changeHandler} />
        </div>
      </div>
      <div className="bg-white p-9 flex flex-col justify-between box-border absolute right-0 h-[100%]  md:block">
        <h1 className="text-[24px] font-bold">Order Menu</h1>

        <OrderMenuCard />
        <div className="flex flex-col justify-center">
          <div className="border-dashed border-t-2 border-gray-400 pt-2 flex justify-between mb-10">
            <p className="font-bold">Sub Total</p>
            <p className="font-bold">{convertIdr(subTotal)}</p>
          </div>
          <button
            className="bg-[#ffca40] py-5 px-6 w-[338px] rounded-lg font-bold"
            onClick={() =>
              dispatch(deleteOrderMenu(localStorage.getItem("userId")))
            }
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
}
