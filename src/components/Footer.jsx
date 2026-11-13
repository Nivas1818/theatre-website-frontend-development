import { Link } from 'react-router-dom'
import { FaFilm, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

// The bar at the bottom of every page.
function Footer() {
  return (
    <footer className="cb-footer">
      <div className="container">
        <div className="row g-4 align-items-center text-center text-lg-start">
          {/* Brand */}
          <div className="col-12 col-lg-4">
            <span className="cb-brand">
              <FaFilm className="text-danger" /> CineBook
            </span>
            <small className="text-secondary d-block mt-1">Book your movie tickets in seconds.</small>
          </div>

          {/* Quick links — centred, wrap instead of overflowing */}
          <div className="col-12 col-lg-4">
            <nav className="footer-links d-flex flex-wrap justify-content-center gap-3 gap-lg-4" aria-label="Footer">
              <Link to="/movies">Movies</Link>
              <Link to="/my-bookings">Bookings</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          {/* Social buttons */}
          <div className="col-12 col-lg-4 d-flex flex-wrap justify-content-center justify-content-lg-end gap-2">
            <a className="social-btn" href="#!" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social-btn" href="#!" aria-label="Instagram"><FaInstagram /></a>
            <a className="social-btn" href="#!" aria-label="Twitter"><FaTwitter /></a>
            <a className="social-btn" href="#!" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <hr className="border-secondary border-opacity-25" />

        {/* Bottom line: copyright left, credits right (stacked on mobile) */}
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-1">
          <p className="text-secondary small mb-0">© 2026 CineBook. All rights reserved.</p>
          <p className="text-secondary small mb-0">Built with React, Vite &amp; Bootstrap.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
