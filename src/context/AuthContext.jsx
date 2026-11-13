import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEMO_USER } from '../constants/auth'

const AuthContext = createContext(null)

// ============================================================
// Keeps track of who is logged in.
// The login is checked against the one account in constants/auth.js.
// ============================================================
export function AuthProvider({ children }) {
  // Saved in localStorage, so you stay logged in after a refresh.
  const [user, setUser] = useLocalStorage('user', null)

  // Returns the user object on success, or null for wrong details.
  function login(email, password) {
    const emailOk = email.trim().toLowerCase() === DEMO_USER.email
    const passwordOk = password === DEMO_USER.password
    if (!emailOk || !passwordOk) return null

    const loggedIn = { email: DEMO_USER.email, name: DEMO_USER.name }
    setUser(loggedIn)
    return loggedIn
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Use in any component:  const { user, isLoggedIn, login, logout } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}
