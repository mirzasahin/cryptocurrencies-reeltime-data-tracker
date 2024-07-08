export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    const formatted = (num / 1_000_000_000_000).toFixed(2);
    return `${formatted.length > 7 ? (num / 1_000_000_000_000).toFixed(1) + "T" : formatted + "T"}`;
  }
  if (num >= 1_000_000_000) {
    const formatted = (num / 1_000_000_000).toFixed(2);
    return `${formatted.length > 7 ? (num / 1_000_000_000).toFixed(1) + "B" : formatted + "B"}`;
  }
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(2);
    return `${formatted.length > 7 ? (num / 1_000_000).toFixed(1) + "M" : formatted + "M"}`;
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatNumberWithTwoDecimals = (num: number): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 10,
  });
};

export const formatPercentage = (num: number): string => {
  return `${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
};
