import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import './AuthPages.css'

export default function SignupPage() {
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
      authService.register(formData)
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <h1>Create account</h1>
        <p>Use just your name and password to create an account and then enter student details after login.</p>

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
              placeholder="Choose a strong password"
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="auth-button auth-button--primary" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-note">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}
