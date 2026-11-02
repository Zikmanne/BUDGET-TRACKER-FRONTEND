import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Categories from "./pages/onboarding/Categories";
import Home from "./pages/dashboard/Home";
// import CreatePlan from "./pages/budget/CreatePlan";
import ExpenseReport from "./pages/reports/ExpenseReport";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/categories" element={<Categories />}/> */}

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/create-plan" element={<CreatePlan />} /> */}
          <Route path="/expense-report" element={<ExpenseReport />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}