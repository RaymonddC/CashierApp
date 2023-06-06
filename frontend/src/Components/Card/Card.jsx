import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Card(props) {
  return (
    <div className="grid grid-cols-5 gap-4 place-items-center">
      {props.data.map((val, idx) => {
        return (
          <div
            key={idx}
            className="bg-[#fff] flex flex-col justify-center w-full items-center rounded-lg p-4 gap-1"
          >
            <img
              className="aspect-square h-[150px] object-cover"
              src={`http://localhost:5000/product_image/${val.product_image}`}
              alt="card"
            />
            <h1 className="text-[18px] font-bold">{val.product_name}</h1>
            <h1 className="text-[16px]">Rp. 12.000,00</h1>
            <div className="w-full flex gap-5 justify-center">
              <button className="p-2 bg-red-500 rounded-lg w-[80px] text-white font-bold text-[14px] flex justify-center items-center gap-1">
                <DeleteIcon sx={{ fontSize: 15 }} />
                Delete
              </button>
              <button className="p-2 bg-blue-500 rounded-lg w-[80px] text-white font-bold text-[14px] flex justify-center items-center gap-1">
                <EditIcon sx={{ fontSize: 15 }} />
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
