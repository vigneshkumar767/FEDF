import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import './AuthPages.css'

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const user = authService.login(formData)
      onLogin(user)
      const nextPage = user.isAdmin ? '/admin' : '/generator'
      navigate(nextPage, { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        <p>Sign in with your name and password to access the student ID generator.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="auth-button auth-button--primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="auth-note">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
        <p className="auth-note auth-note--admin">
          Admin access: use <strong>Admin</strong> / <strong>admin123</strong> to view student card completion stats.
        </p>
      </section>
    </main>
  )
}