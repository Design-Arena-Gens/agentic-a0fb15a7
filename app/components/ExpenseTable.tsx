import type { Expense } from "../types";
import { formatCurrency, formatDate } from "../utils";

type Props = {
  expenses: Expense[];
};

export default function ExpenseTable({ expenses }: Props) {
  if (!expenses.length) {
    return <div className="empty-state">No expenses logged yet.</div>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col" style={{ textAlign: "right" }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>
                <span className="badge expense">{expense.category}</span>
              </td>
              <td>{formatDate(expense.date)}</td>
              <td className="amount" style={{ textAlign: "right" }}>
                {formatCurrency(expense.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
