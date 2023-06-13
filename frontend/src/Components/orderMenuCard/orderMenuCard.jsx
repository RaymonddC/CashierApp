import { useDispatch, useSelector } from "react-redux";
import { convertIdr } from "../../helper/convertCurrency";
import { qtyxprice } from "../../helper/orderHelper";
import { useEffect } from "react";
import {
  decrementQty,
  getOrderMenuByIdUser,
  incrementQty,
} from "../../Features/OrderMenu/OrderMenuSlice";
// icon
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function OrderMenuCard() {
  const dispatch = useDispatch();
  const { orderMenu } = useSelector((state) => state.orderMenu);
  console.log(orderMenu);
  useEffect(() => {
    dispatch(getOrderMenuByIdUser(localStorage.getItem("userId")));
  }, []);
  return (
    <div className="flex flex-col gap-3 h-[410px] overflow-y-auto">
      {orderMenu.map((val, idx) => {
        return (
          <div key={idx} className="flex justify-center items-center gap-5">
            <div className="py-4 px-6 bg-orange-200 rounded-[35px]">
              <img
                className="max-w-[40px] aspect-square"
                src={
                  val?.product?.product_image
                    ? `${process.env.REACT_APP_API_URL}/product_image/${val?.product?.product_image}`
                    : ""
                }
                alt="image"
              />
            </div>
            <div>
              <p className="text-[14px]">{val?.product?.product_name}</p>
              <p className="text-[14px]">
                {val?.product?.price ? convertIdr(val?.product?.price) : ""}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="bg-black rounded-lg"
                onClick={() =>
                  dispatch(incrementQty({ quantity: val.quantity, id: val.id }))
                }
              >
                <AddIcon className="text-[white]" fontSize="medium" />
              </div>
              <p className="text-[14px]">x{val?.quantity}</p>
              <div
                className="bg-black rounded-lg"
                onClick={() =>
                  dispatch(decrementQty({ quantity: val.quantity, id: val.id }))
                }
              >
                <RemoveIcon className="text-[white]" />
              </div>
            </div>
            <p className="text-[14px] font-bold">
              {val?.product?.price
                ? convertIdr(qtyxprice(val?.quantity, val?.product?.price))
                : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}
