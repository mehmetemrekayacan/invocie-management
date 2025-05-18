/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";
import { calculateTotalsHor } from "../components/Utils";
import "./graphbox.css";

const TIME_VIEWS = [
  { value: "week", label: "Hafta" },
  { value: "month", label: "Ay" },
  { value: "year", label: "Yıl" }
];

const MOCK_DATA = [
  { name: "1. Hafta", income: 2000, expense: 1200, profit: 800 },
  { name: "2. Hafta", income: 1800, expense: 1300, profit: 500 },
  { name: "3. Hafta", income: 2400, expense: 1000, profit: 1400 },
  { name: "4. Hafta", income: 2200, expense: 1500, profit: 700 },
];

// Lüks tema için geliştirilmiş renk paleti
const CHART_COLORS = {
  income: "#3B9D6A",  // Daha zarif yeşil - Gelir
  expense: "#CD4C58", // Sofistike kırmızı - Gider
  profit: "#D4AF37"   // Altın - Kar, kurumsal renk korundu
};

const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>Gösterilecek veri yok</h3>
    <p>Verilerinizi burada görmek için işlem ekleyin</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-item" style={{ color: entry.color }}>
            {`${entry.name === "income" ? "Gelir" : entry.name === "expense" ? "Gider" : "Kar"}: ${entry.value.toLocaleString('tr-TR')} ₺`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Özelleştirilmiş Gösterge Bileşeni
const CustomLegend = ({ payload }) => (
  <ul className="pie-legend">
    {payload.map((entry, index) => (
      <li key={`legend-${index}`} className="pie-legend-item">
        <span 
          className="pie-legend-icon" 
          style={{ backgroundColor: entry.color }}
        />
        <span className="pie-legend-text">
          {entry.dataKey === "income" ? "Gelir" : entry.dataKey === "expense" ? "Gider" : "Kar"}
        </span>
      </li>
    ))}
  </ul>
);

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
      console.error("Grafik verileri yüklenirken hata:", error);
      setData(MOCK_DATA); // Hata durumunda örnek verileri göster
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInValue);
    
    // Varsayılan görünümle veri yükle
    updateChartData("week");
    
    // Bileşen yüklendiğinde animasyon ekle
    if (chartRef.current) {
      chartRef.current.classList.add('fade-in');
    }
  }, [updateChartData]);

  const handleViewChange = useCallback((selectedView) => {
    updateChartData(selectedView);
  }, [updateChartData]);

  const chartData = useMemo(() => data.length > 0 ? data : MOCK_DATA, [data]);

  const totals = useMemo(() => ({
    income: chartData.reduce((sum, item) => sum + item.income, 0),
    expense: chartData.reduce((sum, item) => sum + item.expense, 0),
    profit: chartData.reduce((sum, item) => sum + item.profit, 0)
  }), [chartData]);

  return (
    <div className="horizontal--container luxury-shadow" ref={chartRef}>
      <div className="horizontal--header--layout">
        <h2 className="horizontal--header--title">
          {isLoggedIn ? "Finansal Özet" : "Örnek Veriler"}
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
          <p>Veriler yükleniyor...</p>
        </div>
      ) : chartData.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Modern özet kartları */}
          <div className="horizontal--modern-summary">
            <div className="horizontal--modern-card income">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Gelir</span>
                <span className="card-value">{totals.income.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
            <div className="horizontal--modern-card expense">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Gider</span>
                <span className="card-value">{totals.expense.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
            <div className="horizontal--modern-card profit">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Kar</span>
                <span className="card-value">{totals.profit.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          </div>

          <div className="horizontal--chart">
            <ResponsiveContainer width="100%" height={300} minHeight={200}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 15, bottom: 20 }}
                barSize={16}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number" 
                  stroke="none"
                  tickFormatter={(value) => `${value.toLocaleString('tr-TR')} ₺`}
                  tick={{ fill: "var(--title)", fontSize: 10 }}
                  domain={[0, 'dataMax + 500']}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="none"
                  tick={{ fill: "var(--title)", fontSize: 11 }}
                  width={60}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  content={<CustomLegend />}
                  verticalAlign="top"
                  height={50}
                  layout="horizontal"
                  wrapperStyle={{ paddingTop: '10px', paddingBottom: '15px' }}
                />
                <Bar 
                  dataKey="income" 
                  name="Gelir"
                  fill={CHART_COLORS.income} 
                  animationDuration={1200}
                  animationEasing="ease-out"
                  radius={[0, 4, 4, 0]}
                  // Lüks gölge efekti
                  background={{ fill: 'rgba(255,255,255,0.03)', radius: [0, 4, 4, 0] }}
                />
                <Bar 
                  dataKey="expense" 
                  name="Gider"
                  fill={CHART_COLORS.expense} 
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={300}
                  radius={[0, 4, 4, 0]}
                  background={{ fill: 'rgba(255,255,255,0.03)', radius: [0, 4, 4, 0] }}
                />
                <Bar 
                  dataKey="profit" 
                  name="Kar"
                  fill={CHART_COLORS.profit} 
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={600}
                  radius={[0, 4, 4, 0]}
                  background={{ fill: 'rgba(255,255,255,0.03)', radius: [0, 4, 4, 0] }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
