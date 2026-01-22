"use client";

import { useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Summary from "./components/Summary";
import TrendChart from "./components/TrendChart";
import type { Expense } from "./types";
import { generateId } from "./utils";

const initialData: Expense[] = [
  {
    id: "1",
    description: "Groceries",
    category: "Living",
    amount: 82.35,
    date: new Date().toISOString(),
  },
  {
    id: "2",
    description: "Ride share",
    category: "Transport",
    amount: 18.5,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    description: "Coffee with a friend",
    category: "Leisure",
    amount: 9.75,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "4",
    description: "Streaming subscription",
    category: "Subscriptions",
    amount: 12.99,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: "5",
    description: "Utilities",
    category: "Living",
    amount: 106.0,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>(initialData);

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses((prev) => [{ ...expense, id: generateId() }, ...prev]);
  };

  const summary = useMemo(() => {
    if (!expenses.length) {
      return {
        total: 0,
        averageDaily: 0,
        topCategory: "—",
        monthTotal: 0,
      };
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const inMonth = expenses.filter(
      (expense) => new Date(expense.date) >= monthStart
    );

    const monthTotal = inMonth.reduce((sum, expense) => sum + expense.amount, 0);

    const totalsByCategory = expenses.reduce<Record<string, number>>(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
        return acc;
      },
      {}
    );

    const topCategory = Object.entries(totalsByCategory).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    const uniqueDays = new Set(
      expenses.map((expense) =>
        new Date(expense.date).toISOString().slice(0, 10)
      )
    ).size;

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageDaily = uniqueDays ? total / uniqueDays : 0;

    return {
      total,
      averageDaily,
      topCategory: topCategory ?? "—",
      monthTotal,
    };
  }, [expenses]);

  return (
    <main className="grid" style={{ gap: "1.75rem" }}>
      <header className="card" style={{ padding: "2rem 2.25rem" }}>
        <div className="section-title">
          <h1 style={{ margin: 0, fontSize: "1.9rem", letterSpacing: "-0.03em" }}>
            Spending Dashboard
          </h1>
          <span>Realtime overview</span>
        </div>
        <p style={{ margin: "0.75rem 0 0", color: "rgba(226, 232, 240, 0.6)" }}>
          Track where your money goes with a clear, minimal interface.
        </p>
      </header>

      <section className="card">
        <h2>New entry</h2>
        <ExpenseForm onSubmit={addExpense} />
      </section>

      <section className="card">
        <h2>Snapshot</h2>
        <Summary summary={summary} />
      </section>

      <section className="card">
        <h2>7-day trend</h2>
        <TrendChart expenses={expenses} />
      </section>

      <section className="card">
        <div className="section-title">
          <h2>Recent activity</h2>
          <span>{expenses.length} entries</span>
        </div>
        <ExpenseTable expenses={expenses} />
      </section>
    </main>
  );
}
