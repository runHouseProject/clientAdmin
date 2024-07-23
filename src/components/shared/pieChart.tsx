import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const BasicPieChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DonutPieChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

interface UserCountByuAgeProps {
  data: Array<{ name: string; value: number }>;
}

const CustomLabelPieChart: React.FC<UserCountByuAgeProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={150}>
    <PieChart>
      <Pie
        data={data}
        startAngle={180}
        endAngle={0}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export { BasicPieChart, DonutPieChart, CustomLabelPieChart };
