import { useState } from "react";
import "./CreatePlan.css";

// Money is handled as decimals with two places (e.g. 1500.50).
// Sums are done in whole kobo internally so there are no rounding errors.
// TODO: swap these two helpers for src/utils/formatMoney.js once the team adds it.
const toKobo = (value) => {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : 0;
};
const naira = (kobo) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    kobo / 100
  );

// Segment shades for the allocation bar (greys only, red is reserved for "over")
const SHADES = ["#FFFFFF", "#C9C9CE", "#9A9AA1", "#E8E8EC", "#6B6B72", "#B4B4BA"];

const starterCategories = [
  { id: 1, name: "Feeding", budget: "" },
  { id: 2, name: "Transportation", budget: "" },
  { id: 3, name: "Internet", budget: "" },
  { id: 4, name: "Housing support", budget: "" },
];

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M6 6l1 14h10l1-14" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function CreatePlan() {
  const [income, setIncome] = useState("");
  const [categories, setCategories] = useState(starterCategories);
  const [saved, setSaved] = useState(false);

  const incomeKobo = toKobo(income);
  const allocatedKobo = categories.reduce((sum, c) => sum + toKobo(c.budget), 0);
  const unallocatedKobo = incomeKobo - allocatedKobo;
  const isOver = unallocatedKobo < 0;
  const allocatedPct =
    incomeKobo > 0 ? Math.round((allocatedKobo / incomeKobo) * 100) : 0;

  const hasEmptyName = categories.some((c) => c.name.trim() === "");
  const canSave =
    incomeKobo > 0 && categories.length > 0 && !isOver && !hasEmptyName;

  let status = { label: "Start planning", tone: "neutral" };
  if (incomeKobo > 0) {
    if (isOver) status = { label: "Over-allocated", tone: "over" };
    else if (unallocatedKobo === 0 && allocatedKobo > 0)
      status = { label: "Fully allocated", tone: "done" };
    else status = { label: "In progress", tone: "neutral" };
  }

  const touch = () => setSaved(false);

  const updateCategory = (id, field, value) => {
    touch();
    setCategories((list) =>
      list.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCategory = () => {
    touch();
    setCategories((list) => [
      ...list,
      { id: Date.now(), name: "", budget: "" },
    ]);
  };

  const removeCategory = (id) => {
    touch();
    setCategories((list) => list.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!canSave) return;
    const plan = {
      income: incomeKobo / 100,
      categories: categories.map((c) => ({
        name: c.name.trim(),
        budget: toKobo(c.budget) / 100,
      })),
    };
    // TODO: replace with the real API call from src/api/budgets.js
    console.log("Plan ready to send to the backend:", plan);
    setSaved(true);
  };

  return (
    <div className="plan-page">
      <header className="plan-header">
        <h1>Create plan</h1>
        <p>Decide where this month&rsquo;s income goes before you spend it.</p>
      </header>

      {/* Hero summary */}
      <section className="plan-hero" aria-label="Plan summary">
        <div className="hero-top">
          <label htmlFor="income" className="hero-label">
            Monthly income
          </label>
          <span className={`pill pill-${status.tone}`}>{status.label}</span>
        </div>

        <div className="income-field">
          <span aria-hidden="true">₦</span>
          <input
            id="income"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={income}
            onChange={(e) => {
              touch();
              setIncome(e.target.value);
            }}
          />
        </div>

        <div
          className={`alloc-bar ${isOver ? "is-over" : ""}`}
          role="img"
          aria-label={`${allocatedPct}% of income allocated`}
        >
          {!isOver &&
            incomeKobo > 0 &&
            categories.map((c, i) => {
              const k = toKobo(c.budget);
              if (!k) return null;
              return (
                <span
                  key={c.id}
                  style={{
                    width: `${(k / incomeKobo) * 100}%`,
                    background: SHADES[i % SHADES.length],
                  }}
                />
              );
            })}
        </div>

        <dl className="hero-stats">
          <div className="stat">
            <dt>Allocated</dt>
            <dd>{naira(allocatedKobo)}</dd>
          </div>
          <div className="stat">
            <dt>Unallocated</dt>
            <dd className={isOver ? "is-over" : ""}>{naira(unallocatedKobo)}</dd>
          </div>
          <div className="stat">
            <dt>Income planned</dt>
            <dd>{allocatedPct}%</dd>
          </div>
        </dl>

        {incomeKobo === 0 && (
          <p className="hero-note">
            Enter your monthly income to start planning.
          </p>
        )}
        {isOver && (
          <p className="hero-note is-over" role="alert">
            Over by {naira(Math.abs(unallocatedKobo))}. Lower a category budget
            or raise your income.
          </p>
        )}
      </section>

      {/* Categories */}
      <section className="plan-panel" aria-label="Categories">
        <div className="panel-head">
          <h2>
            Categories <span className="count">{categories.length}</span>
          </h2>
          <button type="button" className="btn-primary" onClick={addCategory}>
            <PlusIcon /> Add category
          </button>
        </div>

        {categories.length === 0 && (
          <p className="plan-empty">
            No categories yet. Add one to start splitting your income.
          </p>
        )}

        <ul className="cat-list">
          {categories.map((c) => {
            const k = toKobo(c.budget);
            const pct = incomeKobo > 0 ? (k / incomeKobo) * 100 : 0;
            return (
              <li key={c.id} className="cat-card">
                <span className="cat-avatar" aria-hidden="true">
                  {(c.name.trim()[0] || "?").toUpperCase()}
                </span>

                <input
                  className="cat-name"
                  type="text"
                  aria-label="Category name"
                  placeholder="Category name"
                  value={c.name}
                  onChange={(e) => updateCategory(c.id, "name", e.target.value)}
                />

                <div className="money-box">
                  <span aria-hidden="true">₦</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    aria-label={`Budget for ${c.name || "category"}`}
                    placeholder="0.00"
                    value={c.budget}
                    onChange={(e) =>
                      updateCategory(c.id, "budget", e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => removeCategory(c.id)}
                  aria-label={`Delete ${c.name || "category"}`}
                >
                  <TrashIcon />
                </button>

                <div className="cat-meter">
                  <div className="meter-track">
                    <span style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <span className="share-pill">{Math.round(pct)}% of income</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Sticky action bar */}
      <div className="plan-bar">
        <div className="bar-figure">
          <span>{isOver ? "Over by" : "Left to allocate"}</span>
          <strong className={isOver ? "is-over" : ""}>
            {naira(Math.abs(unallocatedKobo))}
          </strong>
        </div>

        <div className="bar-actions">
          {hasEmptyName && (
            <span className="bar-hint">Name every category to save.</span>
          )}
          {saved && (
            <span className="bar-saved" role="status">
              Plan saved
            </span>
          )}
          <button
            type="button"
            className="btn-primary btn-lg"
            onClick={handleSave}
            disabled={!canSave}
          >
            Save plan
          </button>
        </div>
      </div>
    </div>
  );
}
