import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { SEED_MOVIES, GENRES } from '../constants/cinema'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import MovieGrid from '../components/MovieGrid'

// Ways to sort the movie list. Each function compares two movies.
const SORTS = {
  rating: (a, b) => b.rating - a.rating,
  name: (a, b) => a.name.localeCompare(b.name),
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
}

// The "All Movies" page with search box, filters and the movie grid.
function Movies() {
  useDocumentTitle('All Movies')

  // The four filter settings the user can change.
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('rating')

  // Keep only the movies that match ALL the filters, then sort them.
  const q = search.trim().toLowerCase()
  const visible = SEED_MOVIES.filter((m) => {
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.language.toLowerCase().includes(q)
    const matchesGenre = genre === 'All' || m.genre === genre
    const matchesStatus = status === 'All' || m.status === status
    return matchesSearch && matchesGenre && matchesStatus
  }).sort(SORTS[sort])

  return (
    <div className="container page-pad">
      <h1 className="page-title mb-4">All Movies</h1>

      {/* Search box + status and sort dropdowns */}
      <div className="filters-card fade-up">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-12 col-md-6">
            <div className="cb-search">
              <FaSearch className="cb-search-icon" />
              <input
                type="search"
                className="form-control cb-input cb-search-input"
                placeholder="Search by name, genre or language…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* Small X button to empty the search box */}
              {search && (
                <button className="cb-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select cb-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All shows</option>
              <option value="Now Showing">Now Showing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select cb-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating">Top rated</option>
              <option value="name">Name (A–Z)</option>
              <option value="priceLow">Price: low to high</option>
              <option value="priceHigh">Price: high to low</option>
            </select>
          </div>
        </div>

        {/* Genre buttons */}
        <div className="genre-chips">
          {['All', ...GENRES].map((g) => (
            <button
              key={g}
              className={'genre-chip' + (genre === g ? ' active' : '')}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="text-secondary small mb-3">
        Showing {visible.length} of {SEED_MOVIES.length} movies
      </p>

      <MovieGrid movies={visible} />
    </div>
  )
}

export default Movies
