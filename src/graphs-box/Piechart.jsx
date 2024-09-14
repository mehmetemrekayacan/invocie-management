/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { calculateTotalPie } from "../components/Utils";
import "./graphbox.css";

const COLORS = ["#B30000", "#5E1F1F", "#881717"];

export default function Piechart() {
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("year");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInValue);

    if (isLoggedInValue) {
      updateChartData(selectedView);
    } else {
      loadMockData();
    }
  }, [selectedView]);

  const updateChartData = (view) => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) return;

    const totals = calculateTotalPie(currentUserEmail, view);
    setData(totals);
  };

  const loadMockData = () => {
    const mockData = [
      { name: "Payments", value: 3000 },
      { name: "Tax", value: 1500 },
      { name: "Invoices", value: 4500 },
    ];
    setData(mockData);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleDropdownOptionClick = (view) => {
    setSelectedView(view);
    closeDropdown();
  };

  return (
    <div className="pie--container">
      <div className="pie--header">
        <h2 className="pie--header--title">
          {isLoggedIn ? "Expenses Structure" : "Sample Data"}
        </h2>
        <div
          className={`pie--header--sort ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <span>SORT BY</span>
          <img
            src="/assets/dropdown=dark.svg"
            className="dark-icon"
            alt="sort"
          />
          <img
            src="/assets/dropdown=light.svg"
            className="light-icon"
            alt="sort"
          />
          {isDropdownOpen && (
            <div className="pie--dropdown-menu">
              <div
                className={`pie--dropdown-item ${
                  selectedView === "year" ? "selected" : ""
                }`}
                onClick={() => handleDropdownOptionClick("year")}
              >
                Year
              </div>
              <div
                className={`pie--dropdown-item ${
                  selectedView === "month" ? "selected" : ""
                }`}
                onClick={() => handleDropdownOptionClick("month")}
              >
                Month
              </div>
              <div
                className={`pie--dropdown-item ${
                  selectedView === "week" ? "selected" : ""
                }`}
                onClick={() => handleDropdownOptionClick("week")}
              >
                Week
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pie--chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={(props) => {
                const {
                  name,
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                } = props;
                const RADIAN = Math.PI / 180;
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
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {name}
                    </text>
                  </g>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="pie--footer">
          <div className="pie--footer--item">
            <h2 className="pie--footer--title">Payments:</h2>
            <h2 className="pie--footer--amount">$ {data[0]?.value || 0}</h2>
          </div>
          <div className="pie--footer--item">
            <h2 className="pie--footer--title">Taxes:</h2>
            <h2 className="pie--footer--amount">$ {data[1]?.value || 0}</h2>
          </div>
          <div className="pie--footer--item">
            <h2 className="pie--footer--title">Invoices:</h2>
            <h2 className="pie--footer--amount">$ {data[2]?.value || 0}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
