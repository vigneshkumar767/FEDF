import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import authService from './services/authService.js'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import LandingPage from './components/LandingPage.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import StudentIdCardGenerator from './components/StudentIdCardGenerator.jsx'
import GeneratedIdCardPage from './components/GeneratedIdCardPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  function handleLogin(loggedInUser) {
    setUser(loggedInUser)
  }

  function handleUpdateUser(updatedUser) {
    setUser(updatedUser)
  }

  function handleLogout() {
    authService.logout()
    setUser(null)
  }

  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/generator" replace />
                )
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="/login" element={user ? (user.isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/generator" replace />) : <LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={user ? (user.isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/generator" replace />) : <SignupPage />} />
          <Route
            path="/generator"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <ProtectedRoute user={user}>
                    <StudentIdCardGenerator user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
                  </ProtectedRoute>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/generated"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <ProtectedRoute user={user}>
                    <GeneratedIdCardPage user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} adminOnly>
                <AdminDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App