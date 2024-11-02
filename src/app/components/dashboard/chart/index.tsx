"use client";
import { useContext, useEffect, useState } from "react";
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
  const [chartData, setChartData] = useState([
    {
      name: "Monday",
      actualWeek: 0,
    },
    {
      name: "Tuesday",
      actualWeek: 0,
    },
    {
      name: "Wednesday",
      actualWeek: 0,
    },
    {
      name: "Thursday",
      actualWeek: 0,
    },
    {
      name: "Friday",
      actualWeek: 0,
    },
    {
      name: "Saturday",
      actualWeek: 0,
    },
    {
      name: "Sunday",
      actualWeek: 0,
    },
  ]);
  const [loading, setIsLoading] = useState(true);

  const rawToken = localStorage.getItem("user") ?? "";
  useEffect(() => {
    getChartInfo();
  }, []);
  const getChartInfo = async () => {
    if (!rawToken) return;
    const auth = JSON.parse(rawToken)?.access_token;
    try {
      const response = await fetch(
        `https://mjbackend.azurewebsites.net/company/applications/weekly`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        },
      );

      const data = await response.json();

      if (Object.keys(data)?.length !== 0) {
        setChartData(data);
      }
      console.log("Do not have data");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-[--bgSoft] h-fit p-5 rounded-md">
      <h2 className="font-light text-[--textSoft] mb-5">Weekly applications</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
