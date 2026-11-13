import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

// ============================================================
// One movie poster card, used in all the movie grids.
// ============================================================
function MovieCard({ movie }) {
  return (
    <article className="movie-card fade-up">
      {/* The poster picture is a link to the movie's detail page */}
      <Link to={`/movies/${movie.id}`} className="movie-poster-wrap">
        <img src={movie.poster} alt={`${movie.name} poster`} loading="lazy" />
        <span className="poster-rating">
          <FaStar className="text-warning" /> {movie.rating}
        </span>
        <span className="poster-status">
          {movie.status === 'Upcoming' ? 'Coming Soon' : 'Now Showing'}
        </span>
        <div className="poster-overlay">
          <span className="poster-overlay-btn">View Details</span>
        </div>
      </Link>

      <div className="movie-card-body">
        <div className="movie-card-top">
          <span className="genre-pill">{movie.genre}</span>
          <span className="text-secondary small">{movie.duration}</span>
        </div>
        <h3 className="movie-card-title">
          <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
        </h3>
        <div className="movie-card-bottom">
          <span className="price">
            ₹{movie.price}
            <small>/seat</small>
          </span>
          {movie.status === 'Now Showing' ? (
            <Link to={`/booking/${movie.id}`} className="btn btn-red btn-sm">
              Book Now
            </Link>
          ) : (
            <Link to={`/movies/${movie.id}`} className="btn btn-ghost btn-sm">
              Details
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default MovieCard
