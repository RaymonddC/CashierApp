import { useEffect } from "react";
import Chart from "../../Components/Chart/Chart";
import { useDispatch } from "react-redux";
import { getDataGraph } from "../../Features/Transaction/transactionSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataGraph());
  }, []);
  return (
    <div>
      {/* <div className="w-[700px]"> */}
      <Chart />
      {/* </div> */}
    </div>
  );
}
