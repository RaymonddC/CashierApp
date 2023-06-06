import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { getDataProduct } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card/Card";
import AddIcon from "@mui/icons-material/Add";
// paginate
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function Admin() {
  const dispatch = useDispatch();
  const { dataProduct } = useSelector((state) => state.product);

  const [page, setPage] = useState(1);

  const changeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getDataProduct());
  }, []);

  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full p-9">
        <div className="flex justify-end">
          <button className="p-2 bg-[#FF2351] text-white font-bold rounded-lg flex items-center mb-5 gap-1 text-[14px]">
            <AddIcon />
            ADD PRODUCT
          </button>
        </div>
        <Card data={dataProduct} />
      </div>
    </div>
  );
}
