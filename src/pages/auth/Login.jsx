import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'


export default function Login() {

  return (
     <main className="auth-page">
      <div className="auth-brand">
        <span className="auth-logo-mark" ><img src="/MAINLOGORED.png"/></span>
        
      </div>

      <section className="auth-card">
        <header className="auth-card-header">
          <h1 className="auth-title">Sign in</h1>

          <label className="auth-switch">
            <span className="auth-switch-label">Stay signed in</span>
            <input
              type="checkbox"
              role="switch"
            />
            <span className="auth-switch-track" aria-hidden="true" />
          </label>
        </header>



        <form className="auth-form">
          

          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
           />
          </div>

          <div className="auth-field">
            <div className="auth-field-row">
              <label htmlFor="login-password">Password</label>
              {/* TODO: point this to the real page once "forgot password" exists */}
              <a
                href="#"
                className="auth-link auth-link-small"
              >
                Forgot password?
              </a>
            </div>

            <div className="auth-input-wrap">
              <input
                id="login-password"
                className="auth-input"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="auth-eye"
                aria-label="Show password"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  {/* {showPassword && <path d="M3 3l18 18" />} */}
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Login 
         </button>
        </form>

        <p className="auth-switch-page">
          Don’t have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  )
}
