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

// Lüks tema için geliştirilmiş renk paleti
const CHART_COLORS = {
  Income: "#3B9D6A",  // Daha zarif yeşil - Gelir
  Expense: "#CD4C58", // Sofistike kırmızı - Gider
  Profit: "#D4AF37"   // Altın - Kar, kurumsal renk korundu
};

const TIME_VIEWS = [
  { value: "week", label: "Hafta" },
  { value: "month", label: "Ay" },
  { value: "year", label: "Yıl" }
];

const MOCK_DATA = [
  { name: "Ocak", Income: 5000, Expense: 2000, Profit: 3000 },
  { name: "Şubat", Income: 6000, Expense: 2500, Profit: 3500 },
  { name: "Mart", Income: 7000, Expense: 3000, Profit: 4000 },
];

const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>Gösterilecek veri yok</h3>
    <p>Verilerinizi burada görmek için işlem ekleyin</p>
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
      
      // Veri yoksa örnek verileri kullan
      if (!totals || totals.length === 0) {
        setData(MOCK_DATA);
        setView(selectedView);
        setIsLoading(false);
        return;
      }
      
      const chartData = totals.map(item => ({
        name: item.name,
        Income: item.totalIncome,
        Expense: item.totalExpense,
        Profit: item.profit,
      }));

      setData(chartData);
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

  const CustomTooltip = useCallback(({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {`${entry.name === "Income" ? "Gelir" : entry.name === "Expense" ? "Gider" : "Kar"}: ${entry.value.toLocaleString('tr-TR')} ₺`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  }, []);

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
            {entry.dataKey === "Income" ? "Gelir" : entry.dataKey === "Expense" ? "Gider" : "Kar"}
          </span>
        </li>
        ))}
    </ul>
  );

  // Periyoda özel metinler
  const periodText = useMemo(() => {
    switch(view) {
      case 'week': return 'Haftalık';
      case 'month': return 'Aylık';
      case 'year': return 'Yıllık';
      default: return 'Dönem';
    }
  }, [view]);

  // Görüntülenen veriler için toplamları hesapla
  const totals = useMemo(() => ({
    income: chartData.reduce((sum, item) => sum + (item.Income || 0), 0),
    expense: chartData.reduce((sum, item) => sum + (item.Expense || 0), 0),
    profit: chartData.reduce((sum, item) => sum + (item.Profit || 0), 0)
  }), [chartData]);

  return (
    <div className="bar--container luxury-shadow" ref={chartRef}>
      <div className="bar--header--layout">
        <h2 className="bar--header--title">
          {isLoggedIn ? "Gelir Aktivitesi" : "Örnek Veriler"}
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
          {/* Bar grafiği */}
          <div className="bar--chart">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
                barCategoryGap="15%"
                barGap={3}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="none"
                  tick={{ fill: "var(--title)", fontSize: 12 }}
                  axisLine={{ stroke: 'var(--title-light)' }}
                />
                <YAxis
                  tickFormatter={(value) => `${value.toLocaleString('tr-TR')} ₺`}
                  stroke="none"
                  tick={{ fill: "var(--title)", fontSize: 12 }}
                  axisLine={{ stroke: 'var(--title-light)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} wrapperStyle={{ paddingTop: 20 }} />
                <Bar 
                  dataKey="Income" 
                  name="Gelir"
                  fill={CHART_COLORS.Income} 
                  radius={[6, 6, 0, 0]}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  // Lüks efekt için gölge ve parlaklık
                  fillOpacity={0.9}
                />
                <Bar 
                  dataKey="Expense" 
                  name="Gider"
                  fill={CHART_COLORS.Expense} 
                  radius={[6, 6, 0, 0]}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={300}
                  fillOpacity={0.9}
                />
                <Bar 
                  dataKey="Profit" 
                  name="Kar" 
                  fill={CHART_COLORS.Profit} 
                  radius={[6, 6, 0, 0]}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={600}
                  // Altın rengi için özel parlaklık efekti
                  fillOpacity={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Özet bölümü */}
          <div className="pie--summary">
            <div className="pie--summary-header">
              <h3 className="pie--summary-title">{periodText} Özet</h3>
            </div>
            
            <div className="pie--summary-items">
              <div className="pie--summary-item">
                <span className="pie--summary-dot" style={{ backgroundColor: CHART_COLORS.Income }}></span>
                <span className="pie--summary-name">Toplam Gelir</span>
                <span className="pie--summary-value income">{totals.income.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="pie--summary-item">
                <span className="pie--summary-dot" style={{ backgroundColor: CHART_COLORS.Expense }}></span>
                <span className="pie--summary-name">Toplam Gider</span>
                <span className="pie--summary-value expense">{totals.expense.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="pie--summary-item profit-item">
                <span className="pie--summary-dot" style={{ backgroundColor: CHART_COLORS.Profit }}></span>
                <span className="pie--summary-name">Net Kar</span>
                <span className="pie--summary-value profit">{totals.profit.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
