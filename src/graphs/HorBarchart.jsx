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
import "./graphBox.css";

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
      <div className="container--horgraph">
        <div className="horgraph--title">
          <span>SORT BY</span>
          <img src="/src/assets/Property 1=dark-4.svg" alt="sort" />
        </div>
        <div className="horgraph--header">
          <div className="header-item">
            <h2 className="h2--header">Income</h2>
            <h2 className="amount">$ 4,000</h2>
            <h2 className="details">
              14<span> Income Arrived</span>
            </h2>
          </div>
          <div className="header-item">
            <h2 className="h2--header">Expense</h2>
            <h2 className="amount">$ 2,400</h2>
            <h2 className="details">
              7<span> Expense Paid</span>
            </h2>
          </div>
          <div className="header-item">
            <h2 className="h2--header">Profit</h2>
            <h2 className="amount">$ 1,600</h2>
            <h2 className="details">
              21<span> Total Transaction</span>
            </h2>
          </div>
        </div>
        <ResponsiveContainer width="100%" minHeight={75}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis type="number" stroke="none" />
            <YAxis type="category" dataKey="name" stroke="none" />
            <Tooltip />
            <Legend wrapperStyle={{ marginBottom: 20 }} />
            <Bar dataKey="income" stackId="a" fill="#8890FF" />
            <Bar dataKey="expense" stackId="a" fill="#6A71C5" />
            <Bar dataKey="profit" stackId="a" fill="#30335A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
