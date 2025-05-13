/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { calculateTotalsHor } from "../components/Utils";
import "./graphbox.css";

const TIME_VIEWS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" }
];

const MOCK_DATA = [
  { name: "Week 1", income: 2000, expense: 1200, profit: 800 },
  { name: "Week 2", income: 1800, expense: 1300, profit: 500 },
  { name: "Week 3", income: 2400, expense: 1000, profit: 1400 },
  { name: "Week 4", income: 2200, expense: 1500, profit: 700 },
];

const CHART_COLORS = {
  income: "#3F9E4E",
  expense: "#B04343",
  profit: "#4B67AD"
};

const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>No data to display</h3>
    <p>Add some transactions to see your data here</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-item" style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function HorBarchart() {
  const [data, setData] = useState([]);
  const [view, setView] = useState("week");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  const updateChartData = useCallback((selectedView) => {
    setIsLoading(true);
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) {
      setData(MOCK_DATA);
      setIsLoading(false);
      return;
    }

    try {
      const totals = calculateTotalsHor(currentUserEmail, selectedView);
      setData(totals);
      setView(selectedView);
    } catch (error) {
      console.error("Error loading chart data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInValue);
    
    // Immediate call to load data
    updateChartData("week");
    
    // Add animation to chart on mount
    if (chartRef.current) {
      chartRef.current.classList.add('fade-in');
    }
  }, [updateChartData]);

  const handleViewChange = useCallback((selectedView) => {
    updateChartData(selectedView);
  }, [updateChartData]);

  const totals = useMemo(() => ({
    income: data.reduce((sum, item) => sum + item.income, 0),
    expense: data.reduce((sum, item) => sum + item.expense, 0),
    profit: data.reduce((sum, item) => sum + item.profit, 0)
  }), [data]);

  const chartData = useMemo(() => data, [data]);

  return (
    <div className="horizontal--container" ref={chartRef}>
      <div className="horizontal--header--layout">
        <h2 className="horizontal--header--title">Financial Summary</h2>
        <div className="bar--header--buttons">
          {TIME_VIEWS.map(({ value, label }) => (
            <button
              key={value}
              className={view === value ? "active" : ""}
              onClick={() => handleViewChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="chart-loading">
          <div className="chart-loader"></div>
          <p>Loading data...</p>
        </div>
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="horizontal--header">
            <div className="horizontal--header-item">
              <h2 className="horizontal--h2--header">Income</h2>
              <h2 className="horizontal--amount">
                ${totals.income.toLocaleString()}
              </h2>
              <h2 className="horizontal--details">
                {data.length} <span>Income Arrived</span>
              </h2>
            </div>
            <div className="horizontal--header-item">
              <h2 className="horizontal--h2--header">Expense</h2>
              <h2 className="horizontal--amount">
                ${totals.expense.toLocaleString()}
              </h2>
              <h2 className="horizontal--details">
                {data.length} <span>Expense Paid</span>
              </h2>
            </div>
            <div className="horizontal--header-item">
              <h2 className="horizontal--h2--header">Profit</h2>
              <h2 className="horizontal--amount">
                ${totals.profit.toLocaleString()}
              </h2>
              <h2 className="horizontal--details">
                {data.length} <span>Total Transaction</span>
              </h2>
            </div>
          </div>
          <div className="horizontal--chart">
            <ResponsiveContainer width="100%" height={80}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
              >
                <XAxis type="number" stroke="none" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="none"
                  tick={{ fill: "var(--title)", fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="income" 
                  stackId="a" 
                  fill={CHART_COLORS.income} 
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
                <Bar 
                  dataKey="expense" 
                  stackId="a" 
                  fill={CHART_COLORS.expense} 
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  animationBegin={300}
                />
                <Bar 
                  dataKey="profit" 
                  stackId="a" 
                  fill={CHART_COLORS.profit} 
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  animationBegin={600}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
