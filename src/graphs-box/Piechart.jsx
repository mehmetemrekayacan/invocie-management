/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { calculateTotalPie } from "../components/Utils";
import "./graphbox.css";

// Zaman periyodu seçenekleri
const TIME_VIEWS = [
  { value: "week", label: "Hafta" },
  { value: "month", label: "Ay" },
  { value: "year", label: "Yıl" }
];

// Örnek veri - API bağlantısı olmadığında kullanılır
const MOCK_DATA = [
  { name: "Ödemeler", value: 2957 },
  { name: "Vergiler", value: 15642 },
];

// Finverso lüks renk şeması - lüks temaya uygun
const CHART_COLORS = ["#CD4C58", "#4B67AD", "#D4AF37"];

// Veri yok gösterimi
const EmptyState = () => (
  <div className="chart-empty-state">
    <div className="chart-empty-icon">📊</div>
    <h3>Gösterilecek veri yok</h3>
    <p>Verilerinizi burada görmek için işlem ekleyin</p>
  </div>
);

// Özelleştirilmiş tooltip bileşeni
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0];
  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{data.name}</p>
      <p className="tooltip-item" style={{ color: data.color }}>
        {`Değer: ${data.value.toLocaleString('tr-TR')} ₺`}
      </p>
      <p className="tooltip-item" style={{ color: data.color }}>
        {`Yüzde: ${((data.value / data.payload.total) * 100).toFixed(1)}%`}
      </p>
    </div>
  );
};

// Özelleştirilmiş gösterge bileşeni
const CustomLegend = ({ payload }) => (
  <ul className="pie-legend">
    {payload.map((entry, index) => (
      <li key={`legend-${index}`} className="pie-legend-item">
        <span 
          className="pie-legend-icon" 
          style={{ backgroundColor: entry.color }}
        />
        <span className="pie-legend-text">
          {`${entry.value}: ${((entry.payload.value / entry.payload.total) * 100).toFixed(0)}%`}
        </span>
      </li>
    ))}
  </ul>
);

// Pasta grafiği üzerindeki etiketler için özel fonksiyon
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  index
}) => {
  const RADIAN = Math.PI / 180;
  // Etiketler pastanın içinde gösterilir
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Yüzde çok küçükse etiketi gösterme
  if (percent < 0.05) return null;

  return (
    <g>
      {/* İç etiket - sadece yüzde */}
      <text
        x={x}
        y={y} 
        fill="white" 
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

// Örnek veri oluşturmak için manuel fonksiyon
const generateDemoData = () => {
  // Kullanıcı e-postası var mı?
  const userEmail = localStorage.getItem("currentUserEmail");
  
  if (!userEmail) return MOCK_DATA;
  
  // Kullanıcının vergi ve ödeme verileri
  let taxData = localStorage.getItem(`tax_${userEmail}`);
  let paymentData = localStorage.getItem(`payments_${userEmail}`);
  
  try {
    if (taxData) taxData = JSON.parse(taxData);
    if (paymentData) paymentData = JSON.parse(paymentData);
    
    // Toplam değerleri hesapla
    let taxTotal = 0;
    let paymentTotal = 0;
    
    // Vergi tutarları
    if (Array.isArray(taxData)) {
      taxTotal = taxData.reduce((sum, item) => {
        if (item && item.amount) {
          return sum + parseFloat(item.amount);
        }
        return sum;
      }, 0);
    }
    
    // Ödeme tutarları
    if (Array.isArray(paymentData)) {
      paymentTotal = paymentData.reduce((sum, item) => {
        if (item && item.amount) {
          return sum + parseFloat(item.amount);
        }
        return sum;
      }, 0);
    }
    
    // Veri yoksa boş dizi döndür
    if (taxTotal === 0 && paymentTotal === 0) {
      return [];
    }
    
    return [
      { name: "Ödemeler", value: paymentTotal },
      { name: "Vergiler", value: taxTotal }
    ];
  } catch (error) {
    console.error("Veri işleme hatası:", error);
    return MOCK_DATA;
  }
};

export default function Piechart() {
  const [data, setData] = useState([]);
  const [view, setView] = useState("week");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  // Veriyi güncelleyen yardımcı fonksiyon
  const updateChartData = useCallback((selectedView) => {
    setIsLoading(true);
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    
    if (!currentUserEmail) {
      setData(MOCK_DATA);
      setIsLoading(false);
      return;
    }

    try {
      // Seçili periyoda göre veri hesapla
      const chartData = calculateTotalPie(currentUserEmail, selectedView);
      
      // Veri boşsa veya yoksa örnek veriyi kullan
      if (!chartData || chartData.length === 0 || chartData.every(item => item.value === 0)) {
        setData(MOCK_DATA);
      } else {
        // Gösterilen her veri noktasına toplam değeri ekle (yüzde hesaplamaları için)
        const total = chartData.reduce((sum, item) => sum + item.value, 0);
        setData(chartData.map(item => ({ ...item, total })));
      }
      
      setView(selectedView);
    } catch (error) {
      console.error("Veri yüklenirken hata:", error);
      setData(MOCK_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedInValue);
    
    // Varsayılan görünümle veri yükle
    updateChartData(view);
    
    // Bileşen yüklendikten sonra animasyon ekle
    if (chartRef.current) {
      chartRef.current.classList.add('fade-in');
    }
  }, [updateChartData, view]);

  // Görünüm değiştiğinde veriyi güncelle
  const handleViewChange = useCallback((selectedView) => {
    if (selectedView !== view) {
    updateChartData(selectedView);
    }
  }, [updateChartData, view]);

  // Hesaplanan değerler
  const chartData = useMemo(() => data.length > 0 ? data : MOCK_DATA, [data]);
  const totalAmount = useMemo(() => 
    chartData.reduce((sum, item) => sum + item.value, 0), 
    [chartData]
  );

  // Veri miktarına göre grafik yüksekliğini ayarla (görünürlük sorunlarını çözmek için)
  const chartHeight = useMemo(() => {
    return chartData.length > 0 ? '350px' : '250px';
  }, [chartData]);

  return (
    <div className="pie--container luxury-shadow" ref={chartRef}>
      <div className="pie--header">
        <h2 className="pie--header--title">
          {isLoggedIn ? "Gider Analizi" : "Örnek Veriler"}
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
          <div className="pie--main">
            <div className="pie--chart" style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                  animationBegin={0}
                  animationDuration={1200}
                    animationEasing="ease-out"
                    cx="50%"
                    cy="50%"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={1.5}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    content={<CustomLegend />}
                    verticalAlign="bottom"
                    height={40}
                    layout="horizontal"
                  />
              </PieChart>
            </ResponsiveContainer>
            </div>
          </div>

          {/* Özet bilgileri */}
          <div className="pie--summary">
            <div className="pie--summary-header">
              <h3 className="pie--summary-title">Toplam Giderler</h3>
              <span className="pie--summary-amount">{totalAmount.toLocaleString('tr-TR')} ₺</span>
            </div>
            
            <div className="pie--summary-items">
              {chartData.map((item, index) => (
                <div key={`summary-${index}`} className="pie--summary-item">
                  <span className="pie--summary-dot" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></span>
                  <span className="pie--summary-name">{item.name}</span>
                  <span className="pie--summary-value">{item.value.toLocaleString('tr-TR')} ₺</span>
                  <span className="pie--summary-percent">{((item.value / totalAmount) * 100).toFixed(0)}%</span>
            </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
