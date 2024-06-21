import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", uv: 25, pv: 2400 },
  { name: "Tue", uv: 10, pv: 2210 },
  { name: "Wed", uv: 28, pv: 2290 },
  { name: "Thu", uv: 44, pv: 2000 },
  { name: "Fri", uv: 54, pv: 2181 },
  { name: "Sat", uv: 50, pv: 2500 },
  { name: "Sun", uv: 32, pv: 2500 },
];

const BasicBarChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={100}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const MultiBarChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#8884d8" />
      <Bar dataKey="pv" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

const StackedBarChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" stackId="a" fill="#8884d8" />
      <Bar dataKey="pv" stackId="a" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

export { BasicBarChart, MultiBarChart, StackedBarChart };
