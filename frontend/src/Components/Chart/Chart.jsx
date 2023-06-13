import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    transaction_date: "Page A",
    Total_Aggragate: 4000,
  },
  {
    transaction_date: "Page B",
    Total_Aggragate: 3000,
  },
  {
    transaction_date: "Page C",
    Total_Aggragate: 2000,
  },
  {
    transaction_date: "Page D",
    Total_Aggragate: 2780,
  },
  {
    transaction_date: "Page E",
    Total_Aggragate: 1890,
  },
  {
    transaction_date: "Page F",
    Total_Aggragate: 2390,
  },
  {
    transaction_date: "Page G",
    Total_Aggragate: 3490,
  },
];

export default function Chart() {
  const { graphData } = useSelector((state) => state.transaction);
  console.log(graphData);
  return (
    <ResponsiveContainer width="95%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="transaction_date" />
        <YAxis type="number" domain={[0, 340000]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Total_Aggragate"
          stroke="#82ca9d"
          strokeWidth="px"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
