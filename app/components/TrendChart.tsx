import type { Expense } from "../types";
import { buildTrend, formatCurrency } from "../utils";

type Props = {
  expenses: Expense[];
};

export default function TrendChart({ expenses }: Props) {
  const points = buildTrend(expenses);
  const peak = Math.max(1, ...points.map((point) => point.total));

  return (
    <div className="trend-chart">
      <div className="trend-bars">
        {points.map((point) => (
          <div
            key={point.label}
            className="trend-bar"
            style={{ height: `${(point.total / peak) * 100}%` }}
            title={`${point.label}: ${formatCurrency(point.total)}`}
          />
        ))}
      </div>
      <div className="trend-labels">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
