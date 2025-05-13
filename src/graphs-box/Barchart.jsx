import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { calculateTotals } from "../components/Utils";
import "./graphbox.css";

const CHART_COLORS = {
  Income: "#3F9E4E",
  Expense: "#FF6347",
  Profit: "#FFD700"
};

const TIME_VIEWS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" }
];

const MOCK_DATA = [
  { name: "January", Income: 5000, Expense: 2000, Profit: 3000 },
  { name: "February", Income: 6000, Expense: 2500, Profit: 3500 },
  { name: "March", Income: 7000, Expense: 3000, Profit: 4000 },
];

const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>No data to display</h3>
    <p>Add some transactions to see your data here</p>
  </div>
);

export default function Barchart() {
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
      const totals = calculateTotals(currentUserEmail, selectedView);
      const chartData = totals.map(item => ({
        name: item.name,
        Income: item.totalIncome,
        Expense: item.totalExpense,
        Profit: item.profit,
      }));

      setData(chartData);
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
    
    // Immediate call to load data with default view
    updateChartData("week");
    
    // Add animation to chart on mount
    if (chartRef.current) {
      chartRef.current.classList.add('fade-in');
    }
  }, [updateChartData]);

  const handleViewChange = useCallback((selectedView) => {
    updateChartData(selectedView);
  }, [updateChartData]);

  const chartData = useMemo(() => data, [data]);

  const CustomTooltip = useCallback(({ active, payload, label }) => {
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
  }, []);

  const CustomLegend = ({ payload }) => {
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
            <span className="legend-text">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bar--container" ref={chartRef}>
      <div className="bar--header--layout">
        <h2 className="bar--header--title">Money Activity</h2>
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
      <div className="bar--chart">
        {isLoading ? (
          <div className="chart-loading">
            <div className="chart-loader"></div>
            <p>Loading data...</p>
          </div>
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
              barCategoryGap="10%"
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="none"
                tick={{ fill: "var(--title)", fontSize: 12 }}
                axisLine={{ stroke: 'var(--title-light)' }}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="none"
                tick={{ fill: "var(--title)", fontSize: 12 }}
                axisLine={{ stroke: 'var(--title-light)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar 
                dataKey="Income" 
                fill={CHART_COLORS.Income} 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Bar 
                dataKey="Expense" 
                fill={CHART_COLORS.Expense} 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-in-out"
                animationBegin={300}
              />
              <Bar 
                dataKey="Profit" 
                fill={CHART_COLORS.Profit} 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-in-out"
                animationBegin={600}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
