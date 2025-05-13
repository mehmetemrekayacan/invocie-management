/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { calculateTotalPie } from "../components/Utils";
import "./graphbox.css";

const TIME_VIEWS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" }
];

const MOCK_DATA = [
  { name: "Payments", value: 3000 },
  { name: "Tax", value: 1500 },
  { name: "Invoices", value: 4500 },
];

const CHART_COLORS = ["#B30000", "#5E1F1F", "#881717"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  percent
}) => {
  if (percent === 0) return null;
  
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <rect
        x={x - 40}
        y={y - 15}
        width={80}
        height={30}
        rx={5}
        ry={5}
        fill="var(--pie-legend-background)"
        opacity={0.8}
      />
      <text
        x={x}
        y={y - 5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--pie-legend-text)"
        fontSize={12}
        fontWeight="bold"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--pie-legend-text)"
        fontSize={10}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>No data to display</h3>
    <p>Add some transactions to see your data here</p>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].name}</p>
        <p className="tooltip-item" style={{ color: payload[0].color }}>
          {`Value: $${payload[0].value.toLocaleString()}`}
        </p>
        <p className="tooltip-item" style={{ color: payload[0].color }}>
          {`Percentage: ${((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%`}
        </p>
      </div>
    );
  }
  return null;
};

export default function Piechart() {
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
      const totals = calculateTotalPie(currentUserEmail, selectedView);
      // Add the total value for percentage calculations in tooltip
      const totalValue = totals.reduce((sum, item) => sum + item.value, 0);
      
      // %0 değere sahip olan kalemleri filtrele
      const filteredTotals = totals.filter(item => item.value > 0);
      
      const dataWithTotal = filteredTotals.map(item => ({
        ...item,
        total: totalValue
      }));
      
      setData(dataWithTotal);
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

  const chartData = useMemo(() => data, [data]);

  const totals = useMemo(() => ({
    payments: data[0]?.value || 0,
    taxes: data[1]?.value || 0,
    invoices: data[2]?.value || 0
  }), [data]);

  return (
    <div className="pie--container" ref={chartRef}>
      <div className="pie--header">
        <h2 className="pie--header--title">
          {isLoggedIn ? "Expenses Structure" : "Sample Data"}
        </h2>
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
      ) : data.length === 0 || data.every(item => item.value === 0) ? (
        <EmptyState />
      ) : (
        <>
          <div className="pie--chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pie--footer">
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Payments:</h2>
              <h2 className="pie--footer--amount">$ {totals.payments.toLocaleString()}</h2>
            </div>
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Taxes:</h2>
              <h2 className="pie--footer--amount">$ {totals.taxes.toLocaleString()}</h2>
            </div>
            <div className="pie--footer--item">
              <h2 className="pie--footer--title">Invoices:</h2>
              <h2 className="pie--footer--amount">$ {totals.invoices.toLocaleString()}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
