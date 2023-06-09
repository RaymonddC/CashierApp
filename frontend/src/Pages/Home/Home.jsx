import { FilterProduct } from "../../Components/FilterProduct/FilterProduct";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import Card from "../../Components/Card/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDataProduct } from "../../Features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { dataProduct, pageCount, isLoad } = useSelector(
    (state) => state.product
  );
  const [page, setPage] = useState(1);
  const [pageParams, setPageParams] = useSearchParams();
  console.log(dataProduct);
  useEffect(() => {
    if (pageParams.get("page") === null) {
      setPageParams(`page=1`);
    }
    dispatch(getDataProduct(pageParams.get("page")));
    // setPage(Number(pageParams.get("page")));
  }, []);
  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full">
        <FilterProduct />
        <Card data={dataProduct} currentPage={pageParams.get("page")} />
      </div>
    </div>
  );
}
