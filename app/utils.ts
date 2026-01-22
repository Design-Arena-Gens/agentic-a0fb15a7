import type { Expense, TrendPoint } from "./types";

export const generateId = () => crypto.randomUUID();

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

export const buildTrend = (expenses: Expense[]): TrendPoint[] => {
  const now = new Date();

  return Array.from({ length: 7 }).map((_, indexFromEnd) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - indexFromEnd));
    const key = date.toISOString().slice(0, 10);

    const total = expenses
      .filter((expense) => expense.date.slice(0, 10) === key)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      label: date
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 2)
        .toUpperCase(),
      total,
    };
  });
};
