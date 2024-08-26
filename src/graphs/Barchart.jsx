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
import "./barGraph.css";

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

export default class Barchart extends PureComponent {
  render() {
    return (
      <div className="container--bargraph">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="10%"
            barGap={0}
          >
            <XAxis
              dataKey="name"
              stroke="none"
              tick={{ fill: "#000", fontSize: 11 }}
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
            <Legend wrapperStyle={{ marginBottom: 5 }} />
            <Bar dataKey="Income" fill="#8890FF" activeBar={<Rectangle />} />
            <Bar dataKey="Expense" fill="#30335A" activeBar={<Rectangle />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
