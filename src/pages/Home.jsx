import { FaSearch, FaCouch, FaTicketAlt } from 'react-icons/fa'
import { SEED_MOVIES } from '../constants/cinema'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../components/Hero'
import MovieGrid from '../components/MovieGrid'
import MovieCard from '../components/MovieCard'

// Three reasons to book with CineBook, shown at the bottom.
const FEATURES = [
  {
    icon: FaSearch,
    title: 'Find movies fast',
    text: 'Search, filter by genre and sort by rating to pick the perfect show in seconds.',
  },
  {
    icon: FaCouch,
    title: 'Pick your perfect seat',
    text: 'Interactive seat map with premium and recliner tiers — choose exactly where you sit.',
  },
  {
    icon: FaTicketAlt,
    title: 'Instant confirmation',
    text: 'Your e-ticket with booking reference is ready the moment you confirm.',
  },
]

// The home page: big picture, now showing, coming soon, features.
function Home() {
  useDocumentTitle('Book Movie Tickets Online')

  const showing = SEED_MOVIES.filter((m) => m.status === 'Now Showing')
  const upcoming = SEED_MOVIES.filter((m) => m.status === 'Upcoming')

  return (
    <>
      <Hero />

      <div className="container page-pad">
        <div className="section-head">
          <h2 className="section-title">Currently Showing</h2>
        </div>
        <MovieGrid movies={showing} />

        <div className="section-head">
          <h2 className="section-title">Coming Soon</h2>
        </div>
        {/* A horizontal row you can scroll sideways on small screens */}
        <div className="scroll-row">
          {upcoming.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="section-head">
          <h2 className="section-title">Why Book With CineBook</h2>
        </div>
        <div className="row g-3">
          {FEATURES.map((f) => (
            <div className="col-12 col-md-4" key={f.title}>
              <div className="feature-card fade-up">
                <span className="feature-icon"><f.icon /></span>
                <h5 className="mb-1">{f.title}</h5>
                <p className="text-secondary mb-0 small">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
