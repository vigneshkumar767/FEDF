import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="landing-eyebrow">Student ID generator</span>
          <h1>Create modern student IDs with confidence.</h1>
          <p>
            Register as a student to generate a secure ID instantly, or sign in as the admin to monitor how many students have completed their cards.
          </p>

          <div className="landing-actions">
            <Link to="/login" className="button button--primary">
              Login
            </Link>
            <Link to="/signup" className="button button--secondary">
              Sign up
            </Link>
            <Link to="/login" className="button button--ghost">
              Admin login
            </Link>
          </div>

          <div className="landing-admin-note">
            Admin account: <strong>Admin</strong> / <strong>admin123</strong>
          </div>
        </div>

        <div className="landing-sample">
          <div className="sample-card">
            <div className="sample-card-header">
              <span className="sample-card-label">Student ID</span>
              <span className="sample-card-tag">Sample</span>
            </div>
            <div className="sample-card-photo">
              <div className="sample-card-photo-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                </svg>
              </div>
            </div>
            <div className="sample-card-info">
              <div className="sample-card-row">
                <span className="sample-card-field">Name</span>
                <span className="sample-card-value sample-card-value--placeholder" />
              </div>
              <div className="sample-card-row">
                <span className="sample-card-field">Roll</span>
                <span className="sample-card-value">S-001234</span>
              </div>
              <div className="sample-card-row">
                <span className="sample-card-field">Course</span>
                <span className="sample-card-value">Web Design</span>
              </div>
              <div className="sample-card-row">
                <span className="sample-card-field">Valid</span>
                <span className="sample-card-value">2027</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-highlights">
        <article>
          <h2>Student-friendly flow</h2>
          <p>Students can sign up, log in, and create a validated ID card immediately after login.</p>
        </article>
        <article>
          <h2>Admin tracking</h2>
          <p>The admin dashboard shows how many students have generated an ID card.</p>
        </article>
        <article>
          <h2>Clean, modern experience</h2>
          <p>Smart form controls, attractive cards, and a polished layout make this project easy to use.</p>
        </article>
      </section>
    </main>
  )
}
