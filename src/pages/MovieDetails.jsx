import { Link, useParams } from 'react-router-dom'
import { FaClock, FaLanguage, FaCalendarAlt, FaMapMarkerAlt, FaFilm } from 'react-icons/fa'
import { SEED_MOVIES, THEATRES, SHOW_TIMINGS } from '../constants/cinema'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate } from '../lib/dates'
import Rating from '../components/Rating'
import MovieGrid from '../components/MovieGrid'
import EmptyState from '../components/EmptyState'

// The detail page for one movie, e.g. /movies/4
function MovieDetails() {
  // The number at the end of the address, e.g. '4' in /movies/4
  const { id } = useParams()
  const movie = SEED_MOVIES.find((m) => String(m.id) === String(id))

  useDocumentTitle(movie ? movie.name : 'Movie Not Found')

  // Wrong address? Show a friendly message instead of a broken page.
  if (!movie) {
    return (
      <div className="container page-pad">
        <EmptyState icon={FaFilm} title="Movie not found" text="The movie you're looking for doesn't exist.">
          <Link to="/movies" className="btn btn-red">Back to Movies</Link>
        </EmptyState>
      </div>
    )
  }

  // Other movies of the same genre, shown at the bottom.
  const similar = SEED_MOVIES.filter((m) => m.genre === movie.genre && m.id !== movie.id).slice(0, 4)

  return (
    <>
      {/* Big blurred picture in the background */}
      <div className="detail-backdrop" style={{ backgroundImage: `url(${movie.backdrop})` }} />

      <div className="container detail-page">
        <div className="row g-4 detail-hero">
          {/* Poster picture */}
          <div className="col-12 col-md-4 col-lg-3">
            <img src={movie.poster} alt={`${movie.name} poster`} className="detail-poster" />
          </div>

          {/* Main information */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="mb-2">
              <span className="genre-pill me-2">{movie.genre}</span>
              <span className={'badge ' + (movie.status === 'Now Showing' ? 'bg-danger' : 'bg-secondary')}>
                {movie.status}
              </span>
            </div>
            <h1 className="detail-title">{movie.name}</h1>

            <div className="meta-row">
              <Rating value={movie.rating} />
              <span className="meta-item"><FaClock /> {movie.duration}</span>
              <span className="meta-item"><FaLanguage /> {movie.language}</span>
              <span className="meta-item"><FaCalendarAlt /> {formatDate(movie.releaseDate)}</span>
            </div>

            <p className="detail-desc">{movie.description}</p>

            {/* The actors */}
            <div className="mb-3">
              <h6 className="text-secondary mb-2">Cast</h6>
              <div className="d-flex flex-wrap gap-2">
                {movie.cast.map((name) => (
                  <span className="cast-chip" key={name}>{name}</span>
                ))}
              </div>
            </div>

            {/* Price and the big Book button */}
            <div className="detail-cta">
              <div>
                <span className="text-secondary small d-block">Ticket price</span>
                <span className="detail-price">₹{movie.price}<small> onwards</small></span>
              </div>
              {movie.status === 'Now Showing' ? (
                <Link to={`/booking/${movie.id}`} className="btn btn-red btn-lg">Book Now</Link>
              ) : (
                <button className="btn btn-secondary btn-lg" disabled>Coming Soon</button>
              )}
            </div>
          </div>
        </div>

        {/* Where and when you can watch it */}
        <div className="row g-3 mt-1">
          <div className="col-12 col-lg-6">
            <div className="info-block h-100">
              <h5 className="mb-3">Available Theatres</h5>
              {THEATRES.map((t) => (
                <div className="theatre-line mb-2" key={t.name}>
                  <FaMapMarkerAlt className="text-danger" />
                  <b>{t.name}</b>
                  <span className="text-secondary">· {t.location}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="info-block h-100">
              <h5 className="mb-3">Show Timings</h5>
              <div className="d-flex flex-wrap gap-2">
                {SHOW_TIMINGS.map((t) => (
                  <span className="time-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More movies like this one */}
        {similar.length > 0 && (
          <>
            <div className="section-head">
              <h2 className="section-title">More {movie.genre} Movies</h2>
            </div>
            <MovieGrid movies={similar} />
          </>
        )}
      </div>
    </>
  )
}

export default MovieDetails
