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
import { calculateTotals } from "../components/Utils";
import "./graphbox.css";

export default class Barchart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      view: "year",
    };
  }

  componentDidMount() {
    this.updateChartData("year");
  }

  updateChartData = (view) => {
    const email = "emre@test.tr";
    const totals = calculateTotals(email, view);

    const chartData = totals.map((item) => ({
      name: item.name,
      Income: item.totalIncome,
      Expense: item.totalExpense,
      Profit: item.profit,
    }));

    this.setState({ data: chartData, view });
  };

  render() {
    const { data, view } = this.state;

    return (
      <div className="bar--container">
        <div className="bar--header--layout">
          <h2 className="bar--header--title">Money Activity</h2>
          <div className="bar--header--buttons">
            <button onClick={() => this.updateChartData("year")}>Year</button>
            <button onClick={() => this.updateChartData("month")}>Month</button>
            <button onClick={() => this.updateChartData("week")}>Week</button>
          </div>
        </div>
        <div className="bar--chart">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 10,
              }}
              barCategoryGap="10%"
              barGap={0}
            >
              <XAxis
                dataKey="name"
                stroke="none"
                tick={{ fill: "#000", fontSize: 10 }}
              />
              <YAxis
                tickFormatter={(value) => `$${value}K`}
                stroke="none"
                tick={{ fill: "#000", fontSize: 14 }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip
                formatter={(value) => `$${value}`}
                itemStyle={{ fontSize: "14px" }}
                wrapperStyle={{ backgroundColor: "#000" }}
              />
              <Bar dataKey="Income" fill="#3F9E4E" />
              <Bar dataKey="Expense" fill="#FF6347" />
              <Bar dataKey="Profit" fill="#FFD700" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
