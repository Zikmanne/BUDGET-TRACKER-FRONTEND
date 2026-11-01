import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import CreatePlan from "./pages/budget/CreatePlan";
import ExpenseReport from "./pages/ExpenseReports";
import './App.css'


export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-plan" element={<CreatePlan />} />
            <Route path="/expense-report" element={<ExpenseReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}