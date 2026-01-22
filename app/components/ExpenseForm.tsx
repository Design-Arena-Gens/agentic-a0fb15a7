"use client";

import { useState } from "react";
import type { Expense, ExpenseCategory } from "../types";

const categories: ExpenseCategory[] = [
  "Living",
  "Transport",
  "Leisure",
  "Healthcare",
  "Subscriptions",
  "Other",
];

const defaultExpense: Omit<Expense, "id"> = {
  description: "",
  category: "Living",
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
};

type Props = {
  onSubmit: (expense: Omit<Expense, "id">) => void;
};

export default function ExpenseForm({ onSubmit }: Props) {
  const [formState, setFormState] = useState(defaultExpense);

  const updateField = <K extends keyof typeof formState>(
    key: K,
    value: (typeof formState)[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.description.trim() || Number.isNaN(formState.amount)) {
      return;
    }

    onSubmit({
      description: formState.description.trim(),
      category: formState.category,
      amount: Number(formState.amount),
      date: new Date(formState.date).toISOString(),
    });

    setFormState({ ...defaultExpense, category: formState.category });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Description
        <input
          value={formState.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="e.g. Dinner with friends"
          required
        />
      </label>
      <label>
        Category
        <select
          value={formState.category}
          onChange={(event) =>
            updateField("category", event.target.value as ExpenseCategory)
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Amount
        <input
          type="number"
          min="0"
          step="0.01"
          value={formState.amount || ""}
          onChange={(event) => updateField("amount", Number(event.target.value))}
          placeholder="0.00"
          required
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={formState.date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(event) => updateField("date", event.target.value)}
          required
        />
      </label>
      <div style={{ alignSelf: "end" }}>
        <button type="submit">Log expense</button>
      </div>
    </form>
  );
}
