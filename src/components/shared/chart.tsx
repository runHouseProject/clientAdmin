import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";

const data = [
  { name: "Mon", uv: 25, amt: 2400 },
  { name: "Tue", uv: 10, amt: 2210 },
  { name: "Wed", uv: 28, amt: 2290 },
  { name: "Thu", uv: 44, amt: 2000 },
  { name: "Fri", uv: 54, amt: 2181 },
  { name: "Sat", uv: 50, amt: 2500 },
  { name: "Sun", uv: 32, amt: 2500 },
];

const LineChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="50%" height={50}>
      <LineChart data={data}>
        <Line type="linear" dot={false} dataKey="uv" stroke="#8884d8" strokeWidth="3" />
        <Legend display={"test"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const TinyAreaChartComponent: React.FC = () => {
  return (
    <AreaChart width={150} height={60} data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <Area type="monotone" dataKey="uv" stroke="#4bbff7" fill="#4bbff7" />
    </AreaChart>
  );
};

const BasicLineChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

// export default Chart;

export { LineChartComponent, TinyAreaChartComponent, BasicLineChart };
