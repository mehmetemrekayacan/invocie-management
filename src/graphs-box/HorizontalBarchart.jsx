/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateTotalsHor } from "../components/Utils";
import "./graphbox.css";

export default function HorBarchart() {
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInValue);

    if (isLoggedInValue) {
      updateChartData("year"); // Default to year
    } else {
      loadMockData();
    }
  }, []);

  const updateChartData = (view) => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) return;

    const totals = calculateTotalsHor(currentUserEmail, view);
    setData(totals);
  };

  const loadMockData = () => {
    const mockData = [
      { name: "Week 1", income: 2000, expense: 1200, profit: 800 },
      { name: "Week 2", income: 1800, expense: 1300, profit: 500 },
      { name: "Week 3", income: 2400, expense: 1000, profit: 1400 },
      { name: "Week 4", income: 2200, expense: 1500, profit: 700 },
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

  return (
    <div className="horizontal--container">
      <div className="horizontal--title" ref={dropdownRef}>
        <span>SORT BY</span>
        <div
          className={`horizontal--dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
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
            <div className="horizontal--dropdown-menu">
              <div
                className="horizontal--dropdown-item"
                onClick={() => {
                  updateChartData("year");
                  closeDropdown();
                }}
              >
                Year
              </div>
              <div
                className="horizontal--dropdown-item"
                onClick={() => {
                  updateChartData("month");
                  closeDropdown();
                }}
              >
                Month
              </div>
              <div
                className="horizontal--dropdown-item"
                onClick={() => {
                  updateChartData("week");
                  closeDropdown();
                }}
              >
                Week
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="horizontal--header">
        <div className="horizontal--header-item">
          <h2 className="horizontal--h2--header">Income</h2>
          <h2 className="horizontal--amount">
            ${data.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
          </h2>
          <h2 className="horizontal--details">
            {data.length} <span>Income Arrived</span>
          </h2>
        </div>
        <div className="horizontal--header-item">
          <h2 className="horizontal--h2--header">Expense</h2>
          <h2 className="horizontal--amount">
            $
            {data.reduce((sum, item) => sum + item.expense, 0).toLocaleString()}
          </h2>
          <h2 className="horizontal--details">
            {data.length} <span>Expense Paid</span>
          </h2>
        </div>
        <div className="horizontal--header-item">
          <h2 className="horizontal--h2--header">Profit</h2>
          <h2 className="horizontal--amount">
            ${data.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
          </h2>
          <h2 className="horizontal--details">
            {data.length} <span>Total Transaction</span>
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
