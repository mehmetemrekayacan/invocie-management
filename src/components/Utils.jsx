export const statusLabels = {
  receipt: "Receipt",
  notreceived: "Not Received",
  paid: "Paid",
  unpaid: "Unpaid",
  enabled: "Enabled",
  notenabled: "Not Enabled",
};

export function formatStatus(status) {
  return statusLabels[status.toLowerCase()] || status;
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
