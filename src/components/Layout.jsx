import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Scrolls back to the top whenever the page changes.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// ============================================================
// The shell around every page after login:
// navbar at the top, the page in the middle, footer at the bottom.
// <Outlet /> is the place where the matched page is shown.
// ============================================================
function Layout() {
  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Navbar />
      <main className="page-main flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
