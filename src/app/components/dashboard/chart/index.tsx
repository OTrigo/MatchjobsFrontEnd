"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Monday",
      lastWeek: 10,
      actualWeek: 20,
    },
    {
      name: "Tuesday",
      lastWeek: 3000,
      actualWeek: 1398,
    },
    {
      name: "Wednesday",
      lastWeek: 2000,
      actualWeek: 9800,
    },
    {
      name: "Thursday",
      lastWeek: 2780,
      actualWeek: 3908,
    },
    {
      name: "Friday",
      lastWeek: 1890,
      actualWeek: 4800,
    },
    {
      name: "Saturday",
      lastWeek: 2390,
      actualWeek: 3800,
    },
    {
      name: "Sunday",
      lastWeek: 3490,
      actualWeek: 4300,
    },
  ];
  return (
    <div className="bg-[--bgSoft] h-fit p-5 rounded-md">
      <h2 className="font-light text-[--textSoft] mb-5">Weekly applications</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="actualWeek"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="lastWeek"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
