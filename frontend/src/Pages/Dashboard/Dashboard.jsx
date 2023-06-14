import { useEffect } from "react";
import Chart from "../../Components/Chart/Chart";
import { useDispatch } from "react-redux";
import { getDataGraph } from "../../Features/Transaction/transactionSlice";
import DateRange from "../../Components/DateRange/DateRange";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataGraph({ start: "2023-06-01", end: "2023-06-12" }));
  }, []);
  return (
    <div className="h-[100vh] flex bg-[#f0f0f0] md:pl-[80px]">
      <div className="w-[100%] h-[100%] flex flex-col justify-between p-9 gap-10">
        <div>
          <h1 className="text-[40px] font-bold">DASHBOARD</h1>
          <DateRange />
        </div>
        <div className="w-[100%] h-[100%] max-h-[500px] flex justify-center bg-white rounded-[50px] p-3 ">
          <Chart />
        </div>
      </div>
    </div>
  );
}
