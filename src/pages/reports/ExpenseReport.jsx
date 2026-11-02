import { useState } from "react";
import '../../styles/ExpenseReport.css';


const MONTHS = [
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "October 2026" },
];

const rows = [
  { cat: "Food", budget: 60000, spent: 45000 },
  { cat: "Transport", budget: 30000, spent: 28000 },
  { cat: "Rent", budget: 120000, spent: 120000 },
  { cat: "Entertainment", budget: 15000, spent: 18000 },
];

const income = 250000;
const totalSpent = rows.reduce((sum, r) => sum + r.spent, 0);
const net = income - totalSpent;

const money = (n) => "₦" + n;

export default function ExpenseReport() {
  const [month, setMonth] = useState("2026-10");
  const monthLabel = MONTHS.find((m) => m.value === month).label;


  return (
    <div>
      <h1>Expense report</h1>
      <p className="muted">Monthly summary</p>

      <div className="report-toolbar no-print">
        <div className="field inline">
          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="download-group">
          <button className="outline-btn" >
            Download CSV
          </button>
          <button className="primary-btn">
            Download PDF
          </button>
        </div>
      </div>

      <p className="print-only print-title">
        Monthly expense report: {monthLabel}
      </p>

      <div className="cards">
        <div className="card">
          <span className="card-label">Total income</span>
          <span className="card-value green">{money(income)}</span>
        </div>
        <div className="card">
          <span className="card-label">Total spent</span>
          <span className="card-value red">{money(totalSpent)}</span>
        </div>
        <div className="card">
          <span className="card-label">Net result</span>
          <span className="card-value">{money(net)}</span>
        </div>
      </div>

      <div className="panel">
        <h2>Spending by category</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th className="right">Budget</th>
              <th className="right">Spent</th>
              <th className="right">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const over = r.spent > r.budget;
              return (
                <tr key={r.cat}>
                  <td>{r.cat}</td>
                  <td className="right">{money(r.budget)}</td>
                  <td className="right">{money(r.spent)}</td>
                  <td className="right">
                    <span className={over ? "tag tag-red" : "tag tag-green"}>
                      {over ? "Over budget" : "On track"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}