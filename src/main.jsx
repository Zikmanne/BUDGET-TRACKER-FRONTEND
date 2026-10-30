import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import "@fontsource/manrope"; // Defaults to weight 400
import "@fontsource/manrope/400.css"; // Optional: explicit weight
import "@fontsource/manrope/700.css"; // Optional: explicit bold weight
import Register from './pages/auth/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </StrictMode>,
)