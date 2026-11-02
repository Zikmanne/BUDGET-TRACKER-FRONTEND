import { Link } from "react-router-dom";
import "../styles/Home.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const income = 250000;

const budgets = [
  { name: "Food", spent: 45000, limit: 60000, color: "#2563eb" },
  { name: "Transport", spent: 28000, limit: 30000, color: "#f59e0b" },
  { name: "Rent", spent: 120000, limit: 120000, color: "#16a34a" },
  { name: "Entertainment", spent: 18000, limit: 15000, color: "#dc2626" },
];

const recent = [
  { date: "Oct 26, 2026", note: "Groceries", cat: "Food", amount: -12500 },
  { date: "Oct 25, 2026", note: "Salary", cat: "Income", amount: 250000 },
  { date: "Oct 24, 2026", note: "Bus fare", cat: "Transport", amount: -3000 },
  { date: "Oct 23, 2026", note: "Cinema", cat: "Entertainment", amount: -6000 },
];

const money = (n) => "₦" + Math.abs(n).toLocaleString();

const allocated = budgets.reduce((sum, b) => sum + b.limit, 0);
const spent = budgets.reduce((sum, b) => sum + b.spent, 0);
const unallocated = income - allocated;
const percentSpent = ((spent / income) * 100).toFixed(1);
const balance = income - spent;

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="muted">October 2026</p>

      <div className="dash-summary">
        <p className="dash-summary-label">Monthly income (₦)</p>
        <p className="dash-summary-amount">{income.toLocaleString()}</p>

        <div className="dash-summary-stats">
          <div>
            <div className="dash-stat-value">{money(allocated)}</div>
            <div className="dash-stat-label">Allocated</div>
          </div>
          <div>
            <div className="dash-stat-value">{money(spent)}</div>
            <div className="dash-stat-label">Spent so far</div>
          </div>
          <div>
            <div className="dash-stat-value">{money(unallocated)}</div>
            <div className="dash-stat-label">Unallocated</div>
          </div>
          <div>
            <div className="dash-stat-value">{percentSpent}%</div>
            <div className="dash-stat-label">% of income spent</div>
          </div>
          <div>
            <div className="dash-stat-value">{money(balance)}</div>
            <div className="dash-stat-label">Balance remaining</div>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-panel">
          <div className="dash-panel-head">
            <span className="dash-panel-title">Analytics</span>
            <span className="dash-panel-meta">
              Total spent <strong>{money(spent)}</strong>
            </span>
          </div>

          <div className="dash-pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgets}
                  dataKey="spent"
                  nameKey="name"
                  outerRadius="95%"
                  stroke="none"
                >
                  {budgets.map((b) => (
                    <Cell key={b.name} fill={b.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => money(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-key">
            {budgets.map((b) => (
              <div className="dash-key-item" key={b.name}>
                <span
                  className="dash-key-box"
                  style={{ background: b.color }}
                />
                <span className="dash-key-name">{b.name}</span>
                <span
                  className={
                    b.spent > b.limit ? "dash-key-value red" : "dash-key-value"
                  }
                >
                  {money(b.spent)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <div className="dash-panel-head">
            <span className="dash-panel-title">Most Recent Transactions</span>
            <Link to="/expense-report" className="dash-view-all">
              View All
            </Link>
          </div>

          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t, i) => {
                  const isIncome = t.amount > 0;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{t.note}</td>
                      <td>{t.cat}</td>
                      <td>{t.date}</td>
                      <td>{money(t.amount)}</td>
                      <td
                        className={
                          isIncome ? "dash-type dash-in" : "dash-type dash-out"
                        }
                      >
                        {isIncome ? "Income" : "Expense"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}