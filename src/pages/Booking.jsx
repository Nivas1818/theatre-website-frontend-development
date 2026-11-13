import { Link, useParams } from 'react-router-dom'
import { FaClock, FaLanguage, FaFilm, FaArrowLeft } from 'react-icons/fa'
import { SEED_MOVIES } from '../constants/cinema'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import BookingWizard from '../components/BookingWizard'
import Rating from '../components/Rating'
import EmptyState from '../components/EmptyState'

// The booking page for one movie, e.g. /booking/4
function Booking() {
  const { id } = useParams()
  const movie = SEED_MOVIES.find((m) => String(m.id) === String(id))

  useDocumentTitle(movie ? `Book ${movie.name}` : 'Book Tickets')

  if (!movie) {
    return (
      <div className="container page-pad">
        <EmptyState icon={FaFilm} title="Movie not found" text="You can't book tickets for a movie that doesn't exist.">
          <Link to="/movies" className="btn btn-red">Back to Movies</Link>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="container page-pad booking-page">
      {/* Movie info at the top */}
      <div className="booking-head fade-up">
        <Link to={`/movies/${movie.id}`} className="back-link">
          <FaArrowLeft className="me-1" /> Back to details
        </Link>
        <div className="booking-head-main">
          <img src={movie.poster} alt={movie.name} />
          <div>
            <h1 className="booking-title mb-1">{movie.name}</h1>
            <div className="meta-row">
              <Rating value={movie.rating} />
              <span className="meta-item"><FaClock /> {movie.duration}</span>
              <span className="meta-item"><FaLanguage /> {movie.language}</span>
              <span className="genre-pill">{movie.genre}</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 3-step booking flow */}
      <BookingWizard movie={movie} />
    </div>
  )
}

export default Booking
