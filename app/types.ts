export type Expense = {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
};

export type ExpenseCategory =
  | "Living"
  | "Transport"
  | "Leisure"
  | "Healthcare"
  | "Subscriptions"
  | "Other";

export type TrendPoint = {
  label: string;
  total: number;
};
