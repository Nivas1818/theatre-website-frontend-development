import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FaFilm, FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { DEMO_USER } from '../constants/auth'

// ============================================================
// The login page — the FIRST page of the app.
// Only the correct email + password (see constants/auth.js) work.
// ============================================================
function Login() {
  useDocumentTitle('Login')
  const { isLoggedIn, login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  // If the user was sent here from another page, go back to it after login.
  const cameFrom = location.state?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Already logged in? Then this page is not needed.
  if (isLoggedIn) return <Navigate to="/" replace />

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      return setError('Please enter your email and password.')
    }

    const user = login(email, password)
    if (!user) {
      return setError('Invalid email or password. Please try again.')
    }

    toast(`Welcome, ${user.name}! Enjoy the show.`)
    navigate(cameFrom, { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card fade-up">
        <Link to="/login" className="login-brand">
          <FaFilm /> CineBook
        </Link>
        <h2 className="mb-1">Welcome back</h2>
        <p className="text-secondary">Sign in to book your seats</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              id="login-email"
              type="email"
              className="form-control cb-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <div className="password-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-control cb-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              {/* Show / hide the password text */}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-red w-100 mt-1">Sign In</button>
        </form>

        {/* Which account can log in */}
        <div className="login-hint">
          <FaUserCircle className="login-hint-icon" />
          <div>
            <b>Demo credentials</b>
            <div>{DEMO_USER.email}</div>
            <div>Password: {DEMO_USER.password}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
