import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Expense: 4000,
    Income: 2400,
  },
  {
    name: "Feb",
    Expense: 3000,
    Income: 1398,
  },
  {
    name: "Mar",
    Expense: 2000,
    Income: 9800,
  },
  {
    name: "Apr",
    Expense: 2780,
    Income: 3908,
  },
  {
    name: "May",
    Expense: 1890,
    Income: 4800,
  },
  {
    name: "Jun",
    Expense: 2390,
    Income: 3800,
  },
  {
    name: "Jul",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Aug",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Sep",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Oct",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Nov",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Dec",
    Expense: 3490,
    Income: 4300,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 30,
            bottom: 50,
          }}
          barCategoryGap={5}
        >
          <XAxis
            dataKey="name"
            stroke="none"
            tick={{ fill: "#000", fontSize: 14 }}
          />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}K`}
            stroke="none"
            tick={{ fill: "#000", fontSize: 14 }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            formatter={(value) => `$${value}`}
            itemStyle={{ fontSize: "14px" }}
            wrapperStyle={{ backgroundColor: "#000" }}
          />
          <Legend />
          <Bar dataKey="Income" fill="#11CA00" activeBar={<Rectangle />} />
          <Bar dataKey="Expense" fill="#D70000" activeBar={<Rectangle />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
