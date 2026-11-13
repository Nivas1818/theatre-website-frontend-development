import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// ============================================================
// All the pages (routes) of the app.
//
// /login is the ONLY page you can open without signing in —
// everything else is wrapped in ProtectedRoute, so the login
// page always comes first.
// ============================================================
function App() {
  return (
    <Routes>
      {/* Public: no login needed */}
      <Route path="/login" element={<Login />} />

      {/* Protected: you must be logged in (login page first!) */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
