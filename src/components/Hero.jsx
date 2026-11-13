import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaPlay, FaInfoCircle, FaClock } from 'react-icons/fa'
import { SEED_MOVIES } from '../constants/cinema'
import Rating from './Rating'

// ============================================================
// The big picture at the top of the home page.
// It cycles through the 3 highest-rated movies every 5 seconds.
// ============================================================
function Hero() {
  // The 3 best-rated movies that are currently showing.
  const slides = SEED_MOVIES.filter((m) => m.status === 'Now Showing')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const [index, setIndex] = useState(0) // which slide is visible

  // Move to the next slide every 5 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length) // wraps back to 0
    }, 5000)
    return () => clearInterval(timer) // stop the timer when leaving
  }, [slides.length])

  if (slides.length === 0) return null

  const movie = slides[index]

  // Go one slide left (-1) or right (+1).
  const move = (step) => setIndex((i) => (i + step + slides.length) % slides.length)

  return (
    <section className="hero" aria-label="Featured movies">
      {/* Background images — only the active one is visible */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={'hero-slide' + (i === index ? ' active' : '')}
          style={{ backgroundImage: `url(${slide.backdrop})` }}
          aria-hidden={i !== index}
        />
      ))}
      <div className="hero-overlay" />

      {/* Text on top of the picture */}
      <div className="container hero-content">
        <div className="hero-badges mb-3">
          <span className="badge bg-danger">Now Showing</span>
          <span className="hero-chip">{movie.genre}</span>
          <span className="hero-chip">{movie.language}</span>
        </div>
        <h1 className="hero-title">{movie.name}</h1>
        <div className="hero-meta">
          <Rating value={movie.rating} />
          <span><FaClock /> {movie.duration}</span>
        </div>
        <p className="hero-desc">{movie.description}</p>
        <div className="hero-actions">
          <Link to={`/booking/${movie.id}`} className="btn btn-red btn-lg">
            <FaPlay className="me-2" /> Book Tickets
          </Link>
          <Link to={`/movies/${movie.id}`} className="btn btn-hero-secondary btn-lg">
            <FaInfoCircle className="me-2" /> More Info
          </Link>
        </div>
      </div>

      {/* Left / right arrows */}
      <button className="hero-arrow hero-prev" onClick={() => move(-1)} aria-label="Previous movie">
        <FaChevronLeft />
      </button>
      <button className="hero-arrow hero-next" onClick={() => move(1)} aria-label="Next movie">
        <FaChevronRight />
      </button>

      {/* The small bar buttons under the picture */}
      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            className={'hero-dot' + (i === index ? ' active' : '')}
            onClick={() => setIndex(i)}
            aria-label={`Show ${slide.name}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
