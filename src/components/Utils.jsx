export const statusLabels = {
  receipt: "Receipt",
  notreceived: "Not Received",
  paid: "Paid",
  unpaid: "Unpaid",
  enabled: "Enabled",
  notenabled: "Not Enabled",
};

export const typeLabels = {
  creditcard: "Credit Card",
  cash: "Cash",
  banktransfer: "Bank Transfer",
  other: "Other",
};

export function formatStatus(status) {
  return statusLabels[status.toLowerCase()] || status;
}

export function formatType(type) {
  return typeLabels[type.toLowerCase()] || type;
}

export function formatAmount(amount) {
  if (amount < 1000000) {
    return new Intl.NumberFormat("en-US").format(amount);
  } else if (amount < 1000000000) {
    return (amount / 1000000).toFixed(3).replace(".", ",") + "M";
  } else {
    return (amount / 1000000000).toFixed(3).replace(".", ",") + "B";
  }
}

export const calculateTotals = (email, view) => {
  const incomeData = JSON.parse(localStorage.getItem(`income_${email}`)) || [];
  const invoiceData =
    JSON.parse(localStorage.getItem(`invoice_${email}`)) || [];
  const paymentData =
    JSON.parse(localStorage.getItem(`payments_${email}`)) || [];

  let groupedData = {};

  const getYear = (date) => new Date(date).getFullYear();
  const getMonth = (date) =>
    new Date(date).toLocaleString("default", { month: "short" });
  const getWeek = (date) => {
    const d = new Date(date);
    const start = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
    return `Week ${week}`;
  };

  const getDayOfWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(date).getDay()];
  };

  const groupData = (date, category, amount) => {
    const key =
      view === "month"
        ? getMonth(date)
        : view === "week"
        ? getDayOfWeek(date)
        : getYear(date);
    if (!groupedData[key]) {
      groupedData[key] = { totalIncome: 0, totalExpense: 0, profit: 0 };
    }
    if (category === "income") {
      groupedData[key].totalIncome += amount;
    } else if (category === "expense") {
      groupedData[key].totalExpense += amount;
    }
  };

  incomeData.forEach((item) => {
    if (item.status === "receipt") {
      groupData(item.date, "income", item.amount);
    }
  });

  invoiceData.forEach((item) => {
    if (item.status === "receipt") {
      groupData(item.date, "income", item.billed);
    }
    if (item.status === "notreceived") {
      groupData(item.date, "expense", item.billed);
    }
  });

  paymentData.forEach((item) => {
    if (item.status === "paid") {
      groupData(item.date, "expense", item.amount);
    }
  });

  Object.keys(groupedData).forEach((key) => {
    groupedData[key].profit =
      groupedData[key].totalIncome - groupedData[key].totalExpense;
  });

  let labels = [];

  if (view === "month") {
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = getMonth(month);
      labels.unshift(monthKey);
    }
  } else if (view === "year") {
    labels = [...new Set(Object.keys(groupedData))].sort((a, b) => a - b);
  } else if (view === "week") {
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - i
      );
      const dayKey = getDayOfWeek(day);
      labels.unshift(dayKey);
    }
  }

  return labels.map((label) => ({
    name: label,
    ...(groupedData[label] || { totalIncome: 0, totalExpense: 0, profit: 0 }),
  }));
};
