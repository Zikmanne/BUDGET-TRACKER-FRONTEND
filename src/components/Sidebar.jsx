import { NavLink, Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <span className="auth-logo-mark" ><img src="/MAINLOGORED.png"/></span>
      <nav className="sidebar-nav">

        <NavLink to="/home" end className="sidebar-link">
          Home
        </NavLink>

        <NavLink to="/create-plan" className="sidebar-link">
          Create plan
        </NavLink>

        <NavLink to="/expense-report" className="sidebar-link">
          Expense report
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="logout-btn">
          Sign out
        </Link>
      </div>

    </div>
  );
}