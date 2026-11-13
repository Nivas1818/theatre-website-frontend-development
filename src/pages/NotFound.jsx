import { Link } from 'react-router-dom'
import { FaVideo, FaFilm } from 'react-icons/fa'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// Shown when the address doesn't match any page, e.g. /xyz
function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="container page-pad text-center notfound-page">
      <FaVideo className="notfound-icon" />
      <h1 className="notfound-code">404</h1>
      <h4 className="mb-2">This scene doesn't exist</h4>
      <p className="text-secondary">The page you're looking for was never filmed — or it moved to another reel.</p>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Link to="/" className="btn btn-red"><FaFilm className="me-2" /> Back to Home</Link>
        <Link to="/movies" className="btn btn-ghost">Browse Movies</Link>
      </div>
    </div>
  )
}

export default NotFound
