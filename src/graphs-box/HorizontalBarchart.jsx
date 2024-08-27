import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./graphbox.css";

const data = [
  {
    income: 4000,
    expense: 2400,
    profit: 2400,
  },
];

export default class HorBarchart extends PureComponent {
  render() {
    return (
      <div className="horizontal--container">
        <div className="horizontal--title">
          <span>SORT BY</span>
          <img src="/src/assets/dropdown=dark.svg" alt="sort" />
        </div>
        <div className="horizontal--header">
          <div className="horizontal--header-item">
            <h2 className="horizontal--h2--header">Income</h2>
            <h2 className="horizontal--amount">$ 4,000</h2>
            <h2 className="horizontal--details">
              14<span> Income Arrived</span>
            </h2>
          </div>
          <div className="horizontal--header-item">
            <h2 className="horizontal--h2--header">Expense</h2>
            <h2 className="horizontal--amount">$ 2,400</h2>
            <h2 className="horizontal--details">
              7<span> Expense Paid</span>
            </h2>
          </div>
          <div className="horizontal--header-item">
            <h2 className="horizontal--h2--header">Profit</h2>
            <h2 className="horizontal--amount">$ 1,600</h2>
            <h2 className="horizontal--details">
              21<span> Total Transaction</span>
            </h2>
          </div>
        </div>
        <div className="horizontal--chart">
          <ResponsiveContainer width="100%" height={65}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 10,
              }}
            >
              <XAxis type="number" stroke="none" />
              <YAxis type="category" dataKey="name" stroke="none" />
              <Tooltip
                formatter={(value) => `$${value}`}
                itemStyle={{ fontSize: "14px" }}
                wrapperStyle={{ backgroundColor: "#000" }}
              />
              <Bar dataKey="income" stackId="a" fill="#3F9E4E" />
              <Bar dataKey="expense" stackId="a" fill="#B04343" />
              <Bar dataKey="profit" stackId="a" fill="#4B67AD" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
