import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
      currentUserEmail: "",
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check if the user is logged in
    const currentUserEmail = localStorage.getItem("currentUserEmail");

    if (isLoggedIn && currentUserEmail) {
      this.setState({ currentUserEmail, isLoggedIn }, () => {
        this.updateChartData("year");
      });
    } else {
      this.setState({ isLoggedIn: false }, this.loadMockData); // Load mock data if not logged in
    }
  }

  loadMockData = () => {
    // Define some mock data to display when user is not logged in
    const mockData = [
      { name: "January", Income: 5000, Expense: 2000, Profit: 3000 },
      { name: "February", Income: 6000, Expense: 2500, Profit: 3500 },
      { name: "March", Income: 7000, Expense: 3000, Profit: 4000 },
    ];
    this.setState({ data: mockData });
  };

  updateChartData = (view) => {
    const { currentUserEmail, isLoggedIn } = this.state;
    if (!isLoggedIn || !currentUserEmail) return; // Return if not logged in

    const totals = calculateTotals(currentUserEmail, view);

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
            <button
              className={view === "year" ? "active" : ""}
              onClick={() => this.updateChartData("year")}
            >
              Year
            </button>
            <button
              className={view === "month" ? "active" : ""}
              onClick={() => this.updateChartData("month")}
            >
              Month
            </button>
            <button
              className={view === "week" ? "active" : ""}
              onClick={() => this.updateChartData("week")}
            >
              Week
            </button>
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
