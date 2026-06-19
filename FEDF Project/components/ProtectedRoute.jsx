import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ user, children, adminOnly = false }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/generator" replace />
  }

  return children
}
