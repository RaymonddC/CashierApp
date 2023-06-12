import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertIdr } from "../../helper/convertCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataProduct,
  getDataProductById,
} from "../../Features/product/productSlice";
import {
  incrementQty,
  postOrderMenu,
  setOrderMenu,
} from "../../Features/OrderMenu/OrderMenuSlice";

export default function Card(props) {
  const dispatch = useDispatch();
  const { orderMenu } = useSelector((state) => state.orderMenu);

  const deleteHandler = (id) => {
    dispatch(deleteDataProduct(id, props.currentPage));
  };
  const addToOrderMenu = (data) => {
    for (let i = 0; i < orderMenu.length; i++) {
      if (orderMenu[i].product_id === data.product_id) {
        return dispatch(
          incrementQty({ quantity: orderMenu[i].quantity, id: orderMenu[i].id })
        );
      }
    }
    return dispatch(postOrderMenu(data));

    // console.log(data);
  };

  // console.log(orderMenu);
  return (
    <div
      className={
        window.location.pathname === "/"
          ? "h-full grid grid-cols-4 gap-4 place-items-start max-[420px]:grid-cols-1 max-[420px]:h-fit"
          : "h-full grid grid-cols-5 gap-4 place-items-start max-[420px]:grid-cols-1 max-[420px]:h-fit"
      }
    >
      {props.data.map((val, idx) => {
        return (
          <div
            onClick={
              window.location.pathname === "/"
                ? () =>
                    addToOrderMenu({
                      user_id: 2,
                      product_id: val.id,
                      quantity: 1,
                    })
                : null
            }
            key={idx}
            className="bg-[#fff] flex flex-col justify-center w-full items-center rounded-lg p-4 gap-1"
          >
            <img
              className="aspect-square h-[150px] object-cover"
              src={`${process.env.REACT_APP_API_URL}/product_image/${val.product_image}`}
              alt="card"
            />
            <h1 className="text-[18px] font-bold">{val.product_name}</h1>
            <h1 className="text-[16px]">{convertIdr(val.price)}</h1>
            {window.location.pathname === "/admin" ? (
              <div className="w-full flex gap-5 justify-center">
                <button
                  onClick={() => deleteHandler(val.id)}
                  className="p-2 bg-red-500 rounded-lg w-[80px] text-white font-bold text-[14px] flex justify-center items-center gap-1"
                >
                  <DeleteIcon sx={{ fontSize: 15 }} />
                  Delete
                </button>
                <button
                  onClick={() => {
                    props.handleOpen();
                    dispatch(getDataProductById(val.id));
                  }}
                  className="p-2 bg-blue-500 rounded-lg w-[80px] text-white font-bold text-[14px] flex justify-center items-center gap-1"
                >
                  <EditIcon sx={{ fontSize: 15 }} />
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
