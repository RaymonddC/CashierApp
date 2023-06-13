import { useEffect } from "react";
import Chart from "../../Components/Chart/Chart";
import { useDispatch } from "react-redux";
import { getDataGraph } from "../../Features/Transaction/transactionSlice";
import { Sidebar } from "../../Components/Sidebar/Sidebar";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataGraph());
  }, []);
  return (
    <div className="h-[100vh] flex bg-[#f0f0f0] ml-[80px]">
      <div className="w-[100%] h-[100%] flex flex-col justify-between p-9 gap-10">
        <h1 className="text-[40px] font-bold">DASHBOARD</h1>
        <div className="w-[100%] h-[100%] max-h-[500px] flex justify-center bg-white rounded-[50px] p-3 ">
          <Chart />
        </div>
      </div>
    </div>
  );
}
