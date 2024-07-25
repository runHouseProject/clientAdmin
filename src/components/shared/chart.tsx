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

interface ChartComponentProps {
  data: Array<{ name: string; dataCount: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
        <p className="label">{`시작 주: ${payload[0].payload.name}`}</p>
        <p className="intro">{`참여자 수: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = () => {
  return (
    <div className="font-medium text-center custom-legend">
      <span style={{ color: "#8884d8", textAlign: "center" }}>참여자 수</span>
    </div>
  );
};

const LineChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip content={<CustomTooltip />} />
        <XAxis
          dataKey="name"
          strokeWidth={2} // 축의 두께를 설정합니다.
          tick={{ fontSize: 13, fontWeight: "bold" }} // 텍스트 스타일을 설정합니다.
        />
        {/* <Legend content={<CustomLegend />} /> */}
        <Line type="linear" dataKey="dataCount" stroke="#8884d8" strokeWidth="3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const TinyAreaChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  return (
    <AreaChart width={150} height={60} data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <Area type="monotone" dataKey="uv" stroke="#4bbff7" fill="#4bbff7" />
    </AreaChart>
  );
};

const BasicLineChart: React.FC<ChartComponentProps> = ({ data }) => {
  return (
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
};

// export  Chart;
export { LineChartComponent, TinyAreaChartComponent, BasicLineChart };
