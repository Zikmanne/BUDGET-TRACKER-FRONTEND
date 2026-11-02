import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Categories from './pages/onboarding/Categories.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Login />
    <Register />
    <Categories />
    </BrowserRouter>
  </StrictMode>,
)