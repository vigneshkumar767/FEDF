import { useEffect, useState } from 'react'
import authService from '../services/authService.js'
import './AdminDashboard.css'

export default function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ total: 0, generated: 0, pending: 0 })

  useEffect(() => {
    const allUsers = authService.getAllUsers()
    const studentUsers = allUsers.filter((record) => !record.isAdmin)
    const generatedCount = studentUsers.filter((record) => record.details).length
    setUsers(studentUsers)
    setStats({
      total: studentUsers.length,
      generated: generatedCount,
      pending: studentUsers.length - generatedCount,
    })
  }, [])

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin dashboard</h1>
          <p>Review registered students and see how many have generated their ID cards.</p>
        </div>
        <button type="button" className="button button--danger" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>Total students</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="admin-stat-card admin-stat-card--success">
          <span>Cards generated</span>
          <strong>{stats.generated}</strong>
        </article>
        <article className="admin-stat-card admin-stat-card--muted">
          <span>Pending students</span>
          <strong>{stats.pending}</strong>
        </article>
      </section>

      <section className="admin-grid">
        {users.length === 0 ? (
          <div className="admin-empty">
            <p>No student records are available yet.</p>
          </div>
        ) : (
          users.map((record) => (
            <article key={record.key} className="admin-card">
              <div className="admin-card__header">
                <strong>{record.name}</strong>
                <span>{record.details ? 'Completed' : 'Waiting'}</span>
              </div>
              {record.details ? (
                <div className="admin-card__body">
                  <p>
                    <strong>Student ID:</strong> {record.details.studentId}
                  </p>
                  <p>
                    <strong>Campus:</strong> {record.details.campusName}
                  </p>
                  <p>
                    <strong>Valid until:</strong> {record.details.validity}
                  </p>
                </div>
              ) : (
                <p className="admin-card__empty">This student has not generated an ID card yet.</p>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  )
}
