import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaFilm, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { initialsOf } from '../lib/format'

// The pages shown in the navbar.
const LINKS = [
  { to: '/', name: 'Home' },
  { to: '/movies', name: 'Movies' },
  { to: '/my-bookings', name: 'My Bookings' },
  { to: '/about', name: 'About' },
  { to: '/contact', name: 'Contact' },
]

// The bar at the top of every page.
function Navbar() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false) // mobile menu open?

  function handleLogout() {
    logout()
    toast('You have been logged out. See you soon!', 'info')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg cb-navbar sticky-top">
      <div className="container">
        <Link className="cb-brand" to="/">
          <FaFilm className="text-danger" /> CineBook
        </Link>

        {/* Hamburger button — only visible on small screens */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={'collapse navbar-collapse' + (menuOpen ? ' show' : '')}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 py-2 py-lg-0">
            {LINKS.map((link) => (
              <li className="nav-item" key={link.to}>
                {/* NavLink adds the "active" class automatically
                    when this link matches the current page */}
                <NavLink
                  className={({ isActive }) => 'cb-nav-link nav-link' + (isActive ? ' active' : '')}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* Logged-in user: avatar circle, name and logout button */}
            <li className="nav-item ms-lg-3 d-flex align-items-center gap-2 py-2 py-lg-0">
              <span className="avatar">{initialsOf(user.name)}</span>
              <span className="user-name">{user.name}</span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
