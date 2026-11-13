import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ============================================================
// Guards a page: if you are NOT logged in, you are sent to the
// login page instead. It also remembers where you were going,
// so after logging in you come back to this page.
//
//   <ProtectedRoute> <SomePage /> </ProtectedRoute>
// ============================================================
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
