import { formatCurrency } from "../utils";

type SummaryData = {
  total: number;
  averageDaily: number;
  topCategory: string;
  monthTotal: number;
};

type Props = {
  summary: SummaryData;
};

export default function Summary({ summary }: Props) {
  return (
    <div className="summary-grid">
      <article className="summary-card">
        <span className="badge expense">Total spend</span>
        <strong>{formatCurrency(summary.total)}</strong>
        <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.55)" }}>
          Overall amount tracked so far
        </p>
      </article>

      <article className="summary-card">
        <span className="badge">This month</span>
        <strong>{formatCurrency(summary.monthTotal)}</strong>
        <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.55)" }}>
          Spending recorded in the current month
        </p>
      </article>

      <article className="summary-card">
        <span className="badge">Avg. daily</span>
        <strong>{formatCurrency(summary.averageDaily)}</strong>
        <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.55)" }}>
          Based on unique days logged
        </p>
      </article>

      <article className="summary-card">
        <span className="badge">Top category</span>
        <strong>{summary.topCategory}</strong>
        <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.55)" }}>
          Where most of your money went
        </p>
      </article>
    </div>
  );
}
